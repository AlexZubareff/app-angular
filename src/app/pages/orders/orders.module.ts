import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { CheckboxModule } from 'primeng/checkbox';
import {TreeTableModule} from 'primeng/treetable';
import { OrderHeaderComponent } from './order-header/order-header.component';


@NgModule({
  declarations: [
    OrdersComponent,
    OrderHeaderComponent
    
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    TreeTableModule,
    CheckboxModule
  ]
})
export class OrdersModule { }
