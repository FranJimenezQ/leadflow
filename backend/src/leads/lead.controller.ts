import { Request, Response } from "express";
import { LeadService } from "./lead.service";

const leadService = new LeadService();

// Get all leads
export const getLeads = async (req: Request, res: Response) => {
    leadService.getLeads().subscribe({
        next: (leads) => res.json(leads),
        error: (error) => res.status(500).json({ error: error.message })
    });
};

// Get lead by id
export const getLeadById = async (req: Request, res: Response) => {
    leadService.getLeadById(req.params.id as string).subscribe({
        next: (lead) => lead
            ? res.json(lead)
            : res.status(404).json({ error: 'Lead not found' }),
        error: (error) => res.status(500).json({ error: error.message })
    });
};

// Create lead
export const createLead = async (req: Request, res: Response) => {
    leadService.createLead(req.body).subscribe({
        next: (lead) => res.json(lead),
        error: (error) => res.status(500).json({ error: error.message })
    });
};

// Update lead
export const updateLead = async (req: Request, res: Response) => {
    leadService.updateLead(req.params.id as string, req.body).subscribe({
        next: (lead) => lead
            ? res.json(lead)
            : res.status(404).json({ error: 'Lead not found' }),
        error: (error) => res.status(500).json({ error: error.message })
    });
};

// Delete lead
export const deleteLead = async (req: Request, res: Response) => {
    leadService.deleteLead(req.params.id as string).subscribe({
        next: (lead) => lead
            ? res.json(lead)
            : res.status(404).json({ error: 'Lead not found' }),
        error: (error) => res.status(500).json({ error: error.message })
    });
};