import { Injectable } from '@angular/core';
import { ITour } from 'src/app/models/tours';

@Injectable({
  providedIn: 'root'
})
export class TicketsStorageService {

  private ticketStorage: ITour[];

  constructor() { }

  setStorage(data: ITour[]): void {
    this.ticketStorage = data;
    console.log(this.ticketStorage);

  }
  getStorage(): ITour[] {
    return this.ticketStorage;
  }

}
