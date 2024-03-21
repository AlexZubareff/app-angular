import { Component, OnInit } from '@angular/core';
import { ITour } from 'src/app/models/tours';
import { TicketsStorageService } from 'src/app/services/ticketsStorage/ticketsStorage.service';
import { TicketService } from 'src/app/services/tickets/ticket.service';


@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  tickets: ITour[];
  filter: string = '';
  loading: boolean = false;

  constructor(
    private ticketService: TicketService,
    private ticketStorage: TicketsStorageService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.ticketService.getTickets().subscribe(
      (data: ITour[]) => {
        this.tickets = data;
        this.ticketStorage.setStorage(this.tickets);
      }
    )
      
    this.loading = false;
      
  }

}
