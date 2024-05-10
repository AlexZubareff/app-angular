import { Injectable } from '@angular/core';
import { BookingRestService } from '../rest/booking-rest/booking-rest.service';
import { IBookingUser } from 'src/app/models/booking';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private bookingServiceRest: BookingRestService) { }

  getUsersOrder(): Observable<IBookingUser[]> {
    return this.bookingServiceRest.getUsersOrder().pipe(
      map((data) => {
        const newUserOrderArr: IBookingUser[] = [];
        data.forEach((el) => {
          const newUserOrderArrObj: IBookingUser = {
            age: el.age,
            birthDay: el.birthDay,
            cardNumber: el.cardNumber,
            tourId: el.tourId,
            userId: el.userId,
            _id:el._id, 
          };
          newUserOrderArr.push(newUserOrderArrObj);
        })
        return newUserOrderArr;
      })
    )
  }
}
