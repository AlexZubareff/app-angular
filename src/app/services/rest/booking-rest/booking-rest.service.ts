import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBookingUser } from 'src/app/models/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingRestService {

  constructor(private http: HttpClient) { }

  getUsersOrder(): Observable<IBookingUser[]> {
    return this.http.get<IBookingUser[]>('http://localhost:3000/order/')
  }
}
