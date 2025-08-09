// test/e2e.test.js
// Single E2E test that covers the described user flow.
const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../src/app');

let mongo;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

test('Full user flow: students register, professor posts availability, bookings, cancel, check', async () => {
  // Register professor P1
  const profReg = await request(app)
    .post('/auth/register')
    .send({ name: 'P1', email: 'p1@uni.test', role: 'professor', password: 'pass' });
  expect(profReg.status).toBe(200);
  const profToken = profReg.body.token;
  const profId = profReg.body.user.id;

  // Register student A1
  const a1Reg = await request(app)
    .post('/auth/register')
    .send({ name: 'A1', email: 'a1@uni.test', role: 'student', password: 'pass' });
  expect(a1Reg.status).toBe(200);
  const a1Token = a1Reg.body.token;
  const a1Id = a1Reg.body.user.id;

  // Professor specifies two availability slots T1 and T2
  const now = Date.now();
  const T1start = new Date(now + 60 * 60 * 1000).toISOString(); // +1 hour
  const T1end = new Date(now + 60 * 60 * 1000 + 30 * 60 * 1000).toISOString(); // +1h30
  const T2start = new Date(now + 2 * 60 * 60 * 1000).toISOString(); // +2 hours
  const T2end = new Date(now + 2 * 60 * 60 * 1000 + 30 * 60 * 1000).toISOString(); // +2h30

  const add1 = await request(app)
    .post('/professors/availability')
    .set('Authorization', `Bearer ${profToken}`)
    .send({ start: T1start, end: T1end });
  expect(add1.status).toBe(200);
  const avail1 = add1.body;

  const add2 = await request(app)
    .post('/professors/availability')
    .set('Authorization', `Bearer ${profToken}`)
    .send({ start: T2start, end: T2end });
  expect(add2.status).toBe(200);
  const avail2 = add2.body;

  // Student A1 views available slots for professor
  const slotsA1 = await request(app)
    .get(`/professors/${profId}/slots`)
    .set('Authorization', `Bearer ${a1Token}`);
  expect(slotsA1.status).toBe(200);
  // We expect at least the two slots added
  expect(slotsA1.body.length).toBeGreaterThanOrEqual(2);

  // Student A1 books appointment for T1
  const book1 = await request(app)
    .post('/appointments')
    .set('Authorization', `Bearer ${a1Token}`)
    .send({ availabilityId: avail1._id });
  expect(book1.status).toBe(200);
  const appt1 = book1.body;
  expect(appt1.student).toBeDefined();
  expect(appt1.professor).toBeDefined();
  expect(new Date(appt1.start).toISOString()).toBe(new Date(T1start).toISOString());

  // Register student A2
  const a2Reg = await request(app)
    .post('/auth/register')
    .send({ name: 'A2', email: 'a2@uni.test', role: 'student', password: 'pass' });
  expect(a2Reg.status).toBe(200);
  const a2Token = a2Reg.body.token;

  // Student A2 books appointment for T2
  const book2 = await request(app)
    .post('/appointments')
    .set('Authorization', `Bearer ${a2Token}`)
    .send({ availabilityId: avail2._id });
  expect(book2.status).toBe(200);
  const appt2 = book2.body;
  expect(appt2.student).toBeDefined();
  expect(appt2.professor).toBeDefined();
  expect(new Date(appt2.start).toISOString()).toBe(new Date(T2start).toISOString());

  // Professor cancels appointment with Student A1
  const cancel = await request(app)
    .delete(`/appointments/${appt1._id}`)
    .set('Authorization', `Bearer ${profToken}`);
  expect(cancel.status).toBe(200);
  expect(cancel.body.message).toBeDefined();

  // Student A1 checks their appointments and should have none booked
  const a1Appts = await request(app)
    .get('/appointments/me')
    .set('Authorization', `Bearer ${a1Token}`);
  expect(a1Appts.status).toBe(200);
  expect(Array.isArray(a1Appts.body)).toBe(true);
  expect(a1Appts.body.length).toBe(0);

  // Extra sanity: ensure professor still has one booked appointment (A2)
  // (optional) fetch appointments by querying Appointment model directly
  // but since we're testing via APIs only, check that professor's slot T2 cannot be double-booked
  const doubleBookAttempt = await request(app)
    .post('/appointments')
    .set('Authorization', `Bearer ${a1Token}`)
    .send({ availabilityId: avail2._id });
  expect(doubleBookAttempt.status).toBe(400); // should be already booked
});
