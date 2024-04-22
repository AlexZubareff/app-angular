import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MenubarModule} from 'primeng/menubar';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {CalendarModule} from 'primeng/calendar';

import { TicketsRoutingModule } from './tickets-routing.module';
import { TicketsComponent } from './tickets.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { AsideComponent } from './aside/aside.component';
import { SearchComponent } from 'src/app/components/search/search.component';
import { SearchTourPipe } from 'src/app/pipes/search-tour/search-tour.pipe';
import { BlocksStyleDirective } from 'src/app/directive/blocks-style.directive';
import { SettingsComponent } from '../settings/settings/settings.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { OrdersComponent } from '../orders/orders.component';
import { OrdersModule } from '../orders/orders.module';
import { StatisticComponent } from '../settings/statistic/statistic.component';
import {TableModule} from 'primeng/table'



@NgModule({
  declarations: [
    TicketsComponent,
    HeaderComponent,
    FooterComponent,
    TicketListComponent,
    AsideComponent,
    SearchComponent,
    SearchTourPipe,
    BlocksStyleDirective,
    SettingsComponent,
    StatisticComponent
  ],
  imports: [
    CommonModule,
    TicketsRoutingModule,
    MenubarModule,
    CardModule,
    ButtonModule,
    DropdownModule,
    FormsModule,
    ProgressSpinnerModule,
    CalendarModule,
    ToastModule,
    InputTextModule,
    TabViewModule,
    OrdersModule,
    TableModule
  ],
  providers: [
    MessageService,
  ]
})
export class TicketsModule { }
