const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
  professor: { type: mongoose.Schema.Types.ObjectId, 
                ref: 'User', 
                required: true 
            },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  open: { type: Boolean, default: true }
});

module.exports = mongoose.model('Availability', availabilitySchema);