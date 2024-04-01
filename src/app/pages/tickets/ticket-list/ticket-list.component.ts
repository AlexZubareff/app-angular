import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ITour } from 'src/app/models/tours';
import { TicketsStorageService } from 'src/app/services/ticketsStorage/ticketsStorage.service';
import { TicketService } from 'src/app/services/tickets/ticket.service';
import {  Router } from '@angular/router';
import { BlocksStyleDirective } from 'src/app/directive/blocks-style.directive';


@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  tickets: ITour[];
  filter: string = '';
  loading: boolean = false;

  @ViewChild('tourWrap', {read: BlocksStyleDirective}) blockDirective:BlocksStyleDirective;

  @ViewChild('tourWrap') tourWrap: ElementRef;

  constructor(
    private ticketService: TicketService,
    private ticketStorage: TicketsStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loading = true;
 
    this.ticketService.getTickets().subscribe(
      (data: ITour[]) => {
        this.tickets = data;
        this.ticketStorage.setStorage(data);
        // this.ticketStorage.setStorage(this.tickets);
      }
    )
      
    this.loading = false;
  }

  ngAfterViewInit() {
    
  }

  goToTicketInfoPage(item: ITour) {
    this.router.navigate([`/tickets/ticket/${item.id}`])
  }

  onEnter(ev: {index: number}): void {
    const tour = this.tickets[ev.index];
    this.goToTicketInfoPage(tour);

  }

  directiveRenderComplete(ev: boolean) {
    this.blockDirective.initStyle(3);
  }

}
