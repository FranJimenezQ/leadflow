import { from, Observable } from 'rxjs'

export class WebhookService {
  private n8nBaseUrl = 'http://localhost:5678/webhook'

  notifyLeadCreated(lead: any): Observable<any> {
    return from(
      fetch(`${this.n8nBaseUrl}/lead-created`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lead })
      })
    )
  }
}