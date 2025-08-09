const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Availability = require('../models/Availability');
const Appointment = require('../models/Appointment');

// add slot professors 
router.post('/availability', auth, async (req, res) => {
  try {
    if (req.user.role !== 'professor') {
      return res.status(403).json({ message: 'Only professors can set availability.' });
    }

    const { start, end } = req.body;

    if (!start || !end) {
      return res.status(400).json({ message: 'Please provide both start and end times.' });
    }

    const availability = new Availability({
      professor: req.user._id,
      start,
      end,
    });

    await availability.save();
    res.status(201).json(availability);

  } catch (error) {
    console.error('Error adding availability:', error);
    res.status(500).json({ message: 'Failed to add availability. Please try again.' });
  }
});

// open slots for a professor exclude booked 
router.get('/:profId/slots', auth, async (req, res) => {
  try {
    const { profId } = req.params;

    const availableSlots = await Availability.find({ professor: profId, open: true }).lean();
    const openSlots = [];

    for (const slot of availableSlots) {
      const alreadyBooked = await Appointment.findOne({
        professor: profId,
        start: slot.start,
        end: slot.end,
        status: 'booked',
      });

      if (!alreadyBooked) {
        openSlots.push(slot);
      }
    }

    res.json(openSlots);

  } catch (error) {
    console.error('Error fetching open slots:', error);
    res.status(500).json({ message: 'Failed to fetch open slots. Please try again.' });
  }
});

module.exports = router;
