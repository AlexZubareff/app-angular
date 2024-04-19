import { Component, OnDestroy, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { OrderType } from 'src/app/shared/orders';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {
  private _destroyer: Subscription;

  tableData$: Observable<TreeNode<OrderType[]>[]>;
  tableData: TreeNode<OrderType[]>[] = [];

  constructor(
    private orderService: OrdersService
  ) { }

  ngOnInit(): void {
    this.initOrders();



    this._destroyer = this.orderService.groupOrders$.subscribe(()=>{
      this.initOrders();
    })
  }

  ngOnDestroy(): void {
    this._destroyer.unsubscribe();
  }


  initOrders(): void {
    this.tableData$ = this.orderService.getOrders();
  }

}
