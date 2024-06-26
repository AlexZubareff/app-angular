import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription, forkJoin, fromEvent } from 'rxjs';
import { IOrder } from 'src/app/models/order';
import { INearestTour, INearestTourWithLocation, ITour, ITourLocation } from 'src/app/models/tours';
import { IUser } from 'src/app/models/users';
import { TicketService } from 'src/app/services/tickets/ticket.service';
import { TicketsStorageService } from 'src/app/services/ticketsStorage/ticketsStorage.service';
import { UserService } from 'src/app/services/user/user.service';



@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.sass']
})
export class TicketItemComponent implements OnInit, AfterViewInit, OnDestroy {
  ticket: ITour | undefined;
  user: IUser | null;
  userForm: FormGroup;
  location: ITourLocation[];

  // nearestTours: INearestTour[];
  nearestTours: ITour[];
  toursLocation: ITourLocation[];

  nearestToursWithLocation: INearestTourWithLocation[];

  @ViewChild('ticketSearch') ticketSearch: ElementRef;

  searchTicketSub: Subscription;
  ticketRestSub: Subscription;
  searchTypes = [1,2,3];

  constructor(
    private route: ActivatedRoute,
    private ticketStorage: TicketsStorageService,
    private userService: UserService,
    private ticketService: TicketService,
    private http: HttpClient 
  ) { }

  ngOnInit(): void {

    // first get userInfo
    this.user = this.userService.getUser();
    console.log('User: ', this.user);
    
    // init formGroup
    this.userForm = new FormGroup({
      firstName: new FormControl('', {validators: Validators.required}),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      cardNumber: new FormControl('', Validators.minLength(2)),
      birthDay: new FormControl(''),
      age: new FormControl(),
      citizen: new FormControl(''),

    });



    // this.getTours();


    // params
    const routeIdParam = this.route.snapshot.paramMap.get('id');
    const queryIdParam = this.route.snapshot.queryParamMap.get('id');
    const paramValueId = routeIdParam || queryIdParam;

    if (paramValueId) {
      // const ticketStorage = this.ticketStorage.getStorage();
      console.log('paramValueId: ', paramValueId);

      // this.ticket = ticketStorage.find(el => el.id === paramValueId);
      this.http.get<ITour>('http://localhost:3000/tours/'+ paramValueId).subscribe((data)=>{
        console.log('tiketData: ', data);
        this.ticket = data;
        // console.log('this.ticket.name: ', this.ticket.name);
        
        this.getTours(this.ticket.name);
      });
      // console.log('this.ticket: ', this.ticket);
      
    }
    

  }

  ngAfterViewInit(): void {
    this.userForm.controls['cardNumber'].setValue(this.user?.cardNumber);

    const fromEventObserver = fromEvent(this.ticketSearch.nativeElement, 'keyup', {passive: true});
    this.searchTicketSub = fromEventObserver.subscribe((ev:any) => {
      if(this.ticketSearch.nativeElement.value === '') {
        // this.getTours();


        
        console.log('Сторка пустая');
        
      }
      console.log(this.ticketSearch.nativeElement.value);
      if(ev.code !== 'Space' && ev.code !== 'Backspace'){
        this.initSearchTour();
        console.log('ticketSearch: ', this.ticketSearch);
         
      }
      
    });
  }

  ngOnDestroy(): void {
    this.searchTicketSub.unsubscribe();
  }


  onSubmit() {}

  getTours(ticketName: string){
        this.http.get<ITour[]>('http://localhost:3000/tour-item/' + ticketName).subscribe((data)=>{
          this.nearestTours = data;
          console.log('NearestTicketData: ', data);
        });
  }




  selectDate(ev: Event) {}

  initSearchTour(): void {
    const type = Math.floor(Math.random() * this.searchTypes.length);

    //unsubscribe
    if(this.ticketRestSub && !this.searchTicketSub.closed) {
      this.ticketRestSub.unsubscribe();
    }

    this.ticketRestSub = this.ticketService.getRandomNearestEvent(type).subscribe((data) => {
      this.nearestToursWithLocation = this.ticketService.transformData([data], this.toursLocation);
    })

  }

  initTour(): void {
    const userData = this.userForm.getRawValue();
    const postData = {...this.ticket, ...userData};
console.log('postData: ', postData)

    const userId = this.userService.getUser()?.id || null;
    const orderObj: IOrder = {
      age: postData.age,
      birthDay: postData.birthDay.toDateString().slice(4),
      cardNumber: postData.cardNumber,
      tourId: postData._id,
      userId: userId
    } 

    this.ticketService.sendTourData(orderObj).subscribe();

    console.log('postData: ', postData);
    console.log('this.userForm.getRawValue(): ', this.userForm.getRawValue());
    
    
  }

}
