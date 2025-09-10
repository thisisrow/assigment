class LeadController {
    constructor(leadService) {
        this.leadService = leadService;
    }

    async createLead(req, res) {
        try {
            const leadData = req.body;
            const newLead = await this.leadService.createLead(leadData);
            res.status(201).json(newLead);
        } catch (error) {
            res.status(500).json({ message: 'Error creating lead', error });
        }
    }

    async getLeads(req, res) {
        try {
            const leads = await this.leadService.getLeads();
            res.status(200).json(leads);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving leads', error });
        }
    }
}

export default LeadController;