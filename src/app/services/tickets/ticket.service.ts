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

  nearestToursWithLocation: INearestTourWithLocation[];
  // locationTours: ITourLocation[];

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


transformData(tours: INearestTour[], location: ITourLocation[]){
  const nearestToursWithLocation: INearestTourWithLocation[] = [];

  tours.forEach((tour) => {
    const newTour: INearestTourWithLocation = {...tour};
    newTour.location = location.find((location) => tour.locationId === location.id);
    nearestToursWithLocation.push(newTour)

  } );
  return nearestToursWithLocation
}



// getTicketsWithLocation(): Observable<INearestTourWithLocation[]> {

//  return forkJoin([this.getNearestTours(),this.getToursLocaton()]).pipe(
//   map(data => data[0].map(tourItem => {
    
//     const newTourItem: INearestTourWithLocation = tourItem;

//     console.log('newTourItem: ', newTourItem);
    
//     newTourItem.location = data[1].find(locationItem => tourItem.locationId === locationItem.id);

//     return newTourItem;
//   }))
// )

//   }
  


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

  getRandomNearestEvent(type: number): Observable<INearestTour>{
    return this.ticketServiceRest.getRandomNearestEvent(type)
  }

  sendTourData(data: any): Observable<any> {
    return this.ticketServiceRest.sendTourData(data);

  }

}
