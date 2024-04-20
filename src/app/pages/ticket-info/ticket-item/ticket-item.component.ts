import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
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
export class TicketItemComponent implements OnInit, AfterViewInit {
  ticket: ITour | undefined;
  user: IUser | null;
  userForm: FormGroup;
  location: ITourLocation[];

  nearestTours: INearestTour[];
  toursLocation: ITourLocation[];

  nearestToursWithLocation: INearestTourWithLocation[];

  constructor(
    private route: ActivatedRoute,
    private ticketStorage: TicketsStorageService,
    private userService: UserService,
    private ticketService: TicketService
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

    // get nearest tours
    forkJoin([this.ticketService.getNearestTours(), this.ticketService.getToursLocaton()]).subscribe((data) =>
      {
        console.log('forkJoin DATA: ', data);
        
        this.nearestTours = data[0];
        this.toursLocation = data[1];
      }
    )

    // get nearest tours with location

    this.ticketService.getTicketsWithLocation().subscribe((data) => {
      this.nearestToursWithLocation = data;
      console.log('nearestToursWithLocation: ', this.nearestToursWithLocation);

    });


    // params
    const routeIdParam = this.route.snapshot.paramMap.get('id');
    const queryIdParam = this.route.snapshot.queryParamMap.get('id');
    const paramValueId = routeIdParam || queryIdParam;

    if (paramValueId) {
      const ticketStorage = this.ticketStorage.getStorage();
      this.ticket = ticketStorage.find(el => el.id === paramValueId);
      // console.log('this.ticket: ', this.ticket);
      
    }


  }

  ngAfterViewInit(): void {

    this.userForm.controls['cardNumber'].setValue(this.user?.cardNumber);
  }

  onSubmit() {}
  selectDate(ev: Event) {}

}
