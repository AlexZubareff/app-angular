import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketsComponent } from './tickets.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { SettingsComponent } from '../settings/settings/settings.component';
import { OrdersComponent } from '../orders/orders.component';

const routes: Routes = [
  { 
    path: '', 
    component: TicketsComponent,
    children: [
      {
        path: 'tickets-list',
        component: TicketListComponent
      },
      {
        path: 'orders',
        loadChildren: () => import('../orders/orders.module').then(m => m.OrdersModule)
        // component: OrdersComponent
      },
      {
        path: 'ticket/:id',
        loadChildren: () => import('../ticket-info/ticket-info.module').then(m => m.TicketInfoModule)
      },
      {
        path: 'settings',
        component: SettingsComponent,
        data: {asideHidden: true}
      },
    
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule { }
