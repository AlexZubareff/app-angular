import { Injectable } from '@angular/core';
import { TicketRestService } from '../rest/ticket-rest.service';
import { ITour } from 'src/app/models/tours';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  http: any;
  tickets: ITour[];

  constructor(
    private ticketServiceRest: TicketRestService,
    
    ) { }

  getTickets():Observable<ITour[]> {
    return this.ticketServiceRest.getTickets();
}
}
