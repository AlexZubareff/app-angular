import { Injectable } from '@angular/core';
import { TicketRestService } from '../rest/ticket-rest.service';
import { ITour, ITourTypeSelect } from 'src/app/models/tours';
import { Observable, Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  http: any;
  tickets: ITour[];
  private ticketSubject = new Subject<ITourTypeSelect>();
  readonly ticketType$ = this.ticketSubject.asObservable();

  constructor(
    private ticketServiceRest: TicketRestService,
    
    ) { }

  getTickets():Observable<ITour[]> {
    return this.ticketServiceRest.getTickets().pipe(map(
      (value: ITour[]) => {
        const singleTours = value.filter((item: ITour) => item.type === 'single');
        return value.concat(singleTours);
      }
    ));
}

  getTicketTypeObservable(): Observable<ITourTypeSelect> {
    return this.ticketSubject.asObservable(); 
  }

  updateTour(type: ITourTypeSelect): void {
    this.ticketSubject.next(type);
  }

  getError(): Observable<any> {
    return this.ticketServiceRest.getRestError();
  }

}
