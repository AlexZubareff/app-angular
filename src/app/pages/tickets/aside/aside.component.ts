import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { IMenuType } from 'src/app/models/menuType';
import { ITourTypeSelect } from 'src/app/models/tours';
import { SettigsService } from 'src/app/services/settings/settigs.service';
import { TicketService } from 'src/app/services/tickets/ticket.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {

  menuTypes: IMenuType[];
  public selectedMenuType: IMenuType;
  public showClear: boolean;
 

  tourTypes: ITourTypeSelect[] = [
    {label: 'Все', value: 'all'},
    {label: 'Одиночный', value: 'single'},
    {label: 'Групповой', value: 'multi'}
  ];

  @Output() updateMenuType: EventEmitter<IMenuType> = new EventEmitter()

  constructor(
    private ticketService: TicketService,
    private messageService: MessageService,
    private settingsService: SettigsService
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

  selectDate(ev: any) {
    console.log('ev', ev)
    this.ticketService.updateTour({date:ev})
}

  initRestError(): void {
  this.ticketService.getError().subscribe({
    next: (data) => {
    },
    error: (err) => {
      this.messageService.add({
        severity: 'warn',
        summary: 'Service Message',
        detail: err.error,
        
      });
      console.log('err', err)
    }
  }
    );
  } 

  initSettinsData(): void {
    this.settingsService.loadUserSettingsSubject({saveToken: false});
  }
}


