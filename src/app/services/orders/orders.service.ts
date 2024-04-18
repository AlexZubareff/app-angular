import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { BehaviorSubject, Observable, map, of, switchMap, withLatestFrom } from 'rxjs';
import { ORDERSMOCK, OrderType } from 'src/app/shared/orders';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private groupOrders = new BehaviorSubject(false);
  readonly groupOrders$ = this.groupOrders.asObservable();

  constructor() { }

  getOrders(): Observable<TreeNode<OrderType[]>[]>{
    return of(ORDERSMOCK).pipe(
      withLatestFrom(this.groupOrders$),
      switchMap(([orders, group]) => {
        console.log('group: ', group);
        return of(orders).pipe(
          map((data) => {
            return [this.transformOrderData(data)]
          })
        )
      })
    )

  }

  initGroupOrders(val:boolean): void{
    this.groupOrders.next(val);
  }

  transformOrderData(data: OrderType[]): TreeNode<OrderType[]> {
    const treeNodeObj: TreeNode = {
      children: [],
      data: {
        name: 'Заказы',
      },
      expanded: true
    }

    if (Array.isArray(data)) {
      data.forEach((el)=>{
        const dataObj = {
          data: el
        }
        treeNodeObj.children?.push(dataObj);
      });
    } else {
      return <TreeNode<OrderType[]>>[]
    }
    console.log('treeNodeObj: ', treeNodeObj);
    return treeNodeObj;
  }

}
