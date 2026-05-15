import { from, Observable, tap } from "rxjs";
import { map, pipe } from "rxjs";
import { Lead, ILead } from "./lead.model";
import { WebhookService } from '../webhooks/webhook.service'


export class LeadService {
    private webhookService = new WebhookService()

    // Get all leads
    public getLeads(): Observable<ILead[]> {
        return from(Lead.find().exec()).pipe(
            map((leads) => leads as ILead[])
        );
    }

    // Get lead by id
    public getLeadById(id: string): Observable<ILead> {
        return from(Lead.findById(id).exec()).pipe(
            map((lead) => lead as ILead)
        );
    }

    // Create lead
    public createLead(lead: ILead): Observable<ILead> {
        return from(Lead.create(lead)).pipe(
            map((lead) => lead as ILead),
            tap(savedLead => {
                this.webhookService.notifyLeadCreated(savedLead).subscribe()
            })
        );
    }

    // Update lead
    public updateLead(id: string, lead: ILead): Observable<ILead> {
        return from(Lead.findByIdAndUpdate(id, lead, { new: true }).exec()).pipe(
            map((lead) => lead as ILead)
        );
    }

    // Delete lead
    public deleteLead(id: string): Observable<ILead> {
        return from(Lead.findByIdAndDelete(id).exec()).pipe(
            map((lead) => lead as ILead)
        );
    }
}