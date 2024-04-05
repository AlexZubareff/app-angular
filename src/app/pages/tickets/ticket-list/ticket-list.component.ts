import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ITour, ITourTypeSelect } from 'src/app/models/tours';
import { TicketsStorageService } from 'src/app/services/ticketsStorage/ticketsStorage.service';
import { TicketService } from 'src/app/services/tickets/ticket.service';
import {  Router } from '@angular/router';
import { BlocksStyleDirective } from 'src/app/directive/blocks-style.directive';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  tickets: ITour[];
  filter: string = '';
  loading: boolean = false;
  // private  tourUnsubscriber: Subscription;
  ticketsCopy: ITour[];
  tourUnsubscriber: Subscription;


  @ViewChild('tourWrap', {read: BlocksStyleDirective}) blockDirective:BlocksStyleDirective;

  @ViewChild('tourWrap') tourWrap: ElementRef;

  constructor(
    private ticketService: TicketService,
    private ticketStorage: TicketsStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.tourUnsubscriber = this.ticketService.ticketType$.subscribe((data:ITourTypeSelect) => {  
      console.log('data', data)
      let ticketType: string;
      switch (data.value) {
        case "single":
          this.tickets = this.ticketsCopy.filter((el) => el.type === "single");
          setTimeout(() => {
 
            this.blockDirective.updateItems();
      
            this.blockDirective.initStyle(0);  // сбрасываем индекс на 0 элемент
          });
          break;
        case "multi":
          this.tickets = this.ticketsCopy.filter((el) => el.type === "multi");
          setTimeout(() => {
 
            this.blockDirective.updateItems();
      
            this.blockDirective.initStyle(0);  // сбрасываем индекс на 0 элемент
          });
          break;
        case "all":
          this.tickets = [...this.ticketsCopy];
          setTimeout(() => {
 
            this.blockDirective.updateItems();
      
            this.blockDirective.initStyle(0);  // сбрасываем индекс на 0 элемент
          });
          break;
 
      }
      if (data.date) {
        const dateWithoutTime = new Date(data.date).toISOString().split('T');
        const dateValue = dateWithoutTime[0]
        console.log('dateValue',dateValue)
        this.tickets = this.ticketsCopy.filter((el) => el.date === dateValue);
      }

    });

    this.loading = true;
 
    this.ticketService.getTickets().subscribe(
      (data: ITour[]) => {
        this.tickets = data;
        this.ticketsCopy = [...this.tickets];
        this.ticketStorage.setStorage(data);
        // this.ticketStorage.setStorage(this.tickets);
      }
    )
      
    this.loading = false;
  }

  ngOnDestroy() {
    this.tourUnsubscriber.unsubscribe();
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
