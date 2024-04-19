import { Injectable } from '@angular/core';
import { TicketRestService } from '../rest/ticket-rest.service';
import { INearestTour, INearestTourWithLocation, ITour, ITourLocation, ITourTypeSelect } from 'src/app/models/tours';
import { Observable, Subject, forkJoin, map } from 'rxjs';

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

getTicketsWithLocation(): void {
  const tours = this.getNearestTours().subscribe((data) =>
  {
    console.log('tours DATA: ', data);
  });

  const location =  this.getToursLocaton().subscribe((data) =>
  {
    console.log('tours DATA: ', data);
  });
    
   
    // const nearestTours = data[0];
    // const toursLocation = data[1];
  }
  // .subscribe()
  // console.log(nearestTours);
  


  //  return data




  getTicketTypeObservable(): Observable<ITourTypeSelect> {
    return this.ticketSubject.asObservable(); 
  }

  updateTour(type: ITourTypeSelect): void {
    this.ticketSubject.next(type);
  }

  getError(): Observable<any> {
    return this.ticketServiceRest.getRestError();
  }

  getNearestTours(): Observable<INearestTour[]> {
    return this.ticketServiceRest.getNearestTickets();
  }

  getToursLocaton(): Observable<ITourLocation[]> {
    return this.ticketServiceRest.getLocationList();
  }

}
