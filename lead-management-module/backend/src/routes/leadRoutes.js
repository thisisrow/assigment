const express = require('express');
const router = express.Router();
const LeadController = require('../controllers/leadController');

const leadController = new LeadController();

// Route to create a new lead
router.post('/leads', leadController.createLead);

// Route to get all leads
router.get('/leads', leadController.getAllLeads);

module.exports = router;