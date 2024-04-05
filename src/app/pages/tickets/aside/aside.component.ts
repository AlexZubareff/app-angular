import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IMenuType } from 'src/app/models/menuType';
import { ITourTypeSelect } from 'src/app/models/tours';
import { TicketService } from 'src/app/services/tickets/ticket.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {

  menuTypes: IMenuType[];
  public selectedMenuType: IMenuType;

  tourTypes: ITourTypeSelect[] = [
    {label: 'Все', value: 'all'},
    {label: 'Одиночный', value: 'single'},
    {label: 'Групповой', value: 'multi'}
  ];

  @Output() updateMenuType: EventEmitter<IMenuType> = new EventEmitter()

  constructor(
    private ticketService: TicketService,
  ) { }

  ngOnInit(): void {

    this.menuTypes = [
      {type: 'custom', label : 'Обычный'},
      {type: 'extended', label : 'Расширенный'}
    ]

  }

  changeType(ev: {ev: Event, value: IMenuType}): void {
    console.log('ev', ev)
    this.updateMenuType.emit(ev.value);
  }

  changeTourType(ev:  {ev: Event, value: ITourTypeSelect}): void {
    this.ticketService.updateTour(ev.value)
  }

  selectDate(ev: string) {
    console.log('ev', ev)
    this.ticketService.updateTour({date:ev})
}

}
