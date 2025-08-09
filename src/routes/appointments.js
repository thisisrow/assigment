const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Appointment = require('../models/Appointment');
const Availability = require('../models/Availability');

// create a new appointment student
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Only students can book appointments.' });
    }

    const { availabilityId } = req.body;
    if (!availabilityId) {
      return res.status(400).json({ message: 'Missing availabilityId in request.' });
    }

    const availability = await Availability.findById(availabilityId);
    if (!availability || !availability.open) {
      return res.status(400).json({ message: 'This time slot is not available.' });
    }

    const isAlreadyBooked = await Appointment.findOne({
      professor: availability.professor,
      start: availability.start,
      end: availability.end,
      status: 'booked',
    });

    if (isAlreadyBooked) {
      return res.status(400).json({ message: 'This slot has already been booked.' });
    }

    const appointment = new Appointment({
      professor: availability.professor,
      student: req.user._id,
      start: availability.start,
      end: availability.end,
    });

    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
});

// cancel an appointment professors 
router.delete('/:id', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found.' });
    }

    if (
      req.user.role !== 'professor' ||
      String(appointment.professor) !== String(req.user._id)
    ) {
      return res.status(403).json({ message: 'You are not authorized to cancel this appointment.' });
    }

    appointment.status = 'cancelled';
    await appointment.save();

    await Availability.updateMany(
      {
        professor: appointment.professor,
        start: appointment.start,
        end: appointment.end,
      },
      { $set: { open: true } }
    );

    res.json({ message: 'Appointment has been cancelled.' });
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
});

// get current student's booked appointments
router.get('/me', auth, async (req, res) => {
  try {
    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Only students can view their appointments.' });
    }

    const appointments = await Appointment.find({
      student: req.user._id,
      status: 'booked',
    }).populate('professor', 'name email');

    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
});

module.exports = router;
