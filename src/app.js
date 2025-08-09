const express = require('express');
const app = express();
app.use(express.json());

const authRoutes = require('./routes/auth');
const profRoutes = require('./routes/professors');
const apptRoutes = require('./routes/appointments');

app.use('/auth', authRoutes);
app.use('/professors', profRoutes);
app.use('/appointments', apptRoutes);

app.get('/', (req, res) => res.json({ ok: true }));

module.exports = app;