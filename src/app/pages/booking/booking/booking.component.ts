import { Component, OnInit } from '@angular/core';
import { IBookingUser } from 'src/app/models/booking';
import { BookingService } from 'src/app/services/booking/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  cols = [
    {field: '_id', header: 'ID заказа'},
    {field: 'userId', header: 'ID пользователя'},
    {field: 'tourId', header: 'ID тура'},
    {field: 'cardNumber', header: 'Номер карты'},
    {field: 'age', header: 'Возраст'},
    {field: 'birthDay', header: 'Дата рождения'},
  ];

  usersOrders: IBookingUser[];

  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    this.bookingService.getUsersOrder().subscribe((data) => {
      this.usersOrders = data;
  })
  }
}
