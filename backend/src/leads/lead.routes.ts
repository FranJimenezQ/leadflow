import { Router } from "express";
import { createLead, deleteLead, getLeadById, getLeads, updateLead } from "./lead.controller";

const router = Router();

router.get('/', getLeads);
router.get('/:id', getLeadById);
router.post('/', createLead);
router.put('/:id', updateLead);
router.delete('/:id', deleteLead);

export default router;