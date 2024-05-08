import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ITour, ITourTypeSelect } from 'src/app/models/tours';
import { TicketsStorageService } from 'src/app/services/ticketsStorage/ticketsStorage.service';
import { TicketService } from 'src/app/services/tickets/ticket.service';
import {  Router } from '@angular/router';
import { BlocksStyleDirective } from 'src/app/directive/blocks-style.directive';
import { Subscription, debounceTime, fromEvent } from 'rxjs';


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

  @ViewChild('ticketSearch') ticketSearch: ElementRef;

  searchTicketSub: Subscription;
  ticketSearchValue: string;

  constructor(
    private ticketService: TicketService,
    private ticketStorage: TicketsStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.tourUnsubscriber = this.ticketService.ticketType$.subscribe((data:ITourTypeSelect) => {  
      console.log('data', data);

      let ticketType: string;
      
      switch (data.value) {
        case "single":
          this.tickets = this.ticketsCopy.filter((el) => el.type === "single");
  
          break;
        case "multi":
          this.tickets = this.ticketsCopy.filter((el) => el.type === "multi");

          break;
        case "all":
          this.tickets = [...this.ticketsCopy];

          break;
 
      }
      if (data.date) {
        const dateWithoutTime = new Date(data.date).toISOString().split('T');
        const dateValue = dateWithoutTime[0]
        console.log('dateValue',dateValue)
        this.tickets = this.ticketsCopy.filter((el) => el.date === dateValue);
      }

      setTimeout(() => {
 
        this.blockDirective.updateItems();
  
        this.blockDirective.initStyle(0);  // сбрасываем индекс на 0 элемент
      });
    });

    this.loading = true;

    this.ticketService.ticketUpdateSubject$.subscribe((data) => {
      this.tickets = data;
      this.ticketsCopy = [...this.tickets];
      this.ticketStorage.setStorage(data);

    })

    this.ticketService.getTickets().subscribe((data: ITour[]) => {
        this.tickets = data;
        this.ticketsCopy = [...this.tickets];
        this.ticketStorage.setStorage(data);

        // this.ticketStorage.setStorage(this.tickets);
      }
    )
      
    this.loading = false;
  }



  ngAfterViewInit() {

    const fromEventOserver = fromEvent(this.ticketSearch.nativeElement, 'keyup', {passive: true});

    this.searchTicketSub = fromEventOserver.pipe(debounceTime(200)).subscribe (
      (ev: any) => {
        if(this.ticketSearchValue) {
          this.tickets = this.ticketsCopy.filter((el) => el.name.toLowerCase().includes(this.ticketSearchValue.toLowerCase()));
        } else {
          this.tickets = [...this.ticketsCopy];
        }
      }
    )
    
  }

  ngOnDestroy() {
    this.tourUnsubscriber.unsubscribe();
    this.searchTicketSub.unsubscribe();
   }

  goToTicketInfoPage(item: ITour) {
    this.router.navigate([`/tickets/ticket/${item._id}`])
  }

  onEnter(ev: {index: number}): void {
    const tour = this.tickets[ev.index];
    this.goToTicketInfoPage(tour);

  }

  directiveRenderComplete(ev: boolean) {
    this.blockDirective.initStyle(3);
  }

}
