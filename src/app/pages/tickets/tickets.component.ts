import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, ActivationStart, Router } from '@angular/router';
import { Subject, filter, takeUntil, tap } from 'rxjs';
import { IMenuType } from 'src/app/models/menuType';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit, OnDestroy {

  selectedType: IMenuType;
  showAside = true;
  destroyer = new Subject();

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    // console.log('update ticets.components');

    this.showAside = !this.recursFindPropertyInData(this.route.snapshot, 'asideHidden');

    this.router.events.pipe(
      // tap((data) => {console.log('data', data)}),
      filter((ev) => ev instanceof ActivationStart),
      takeUntil(this.destroyer)
    ).subscribe((data) => {
      if(data instanceof ActivationStart) {
        this.showAside = !this.recursFindPropertyInData(data.snapshot, 'asideHidden')
      }
    });
    
  }


  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }
  
  updateSelectedType(ev: IMenuType): void {
    this.selectedType = ev;
  }

  recursFindPropertyInData(currentSnapshot: ActivatedRouteSnapshot, searchProp: string): boolean {
    // console.log('currentSnapshot: ', currentSnapshot);
    
    if(currentSnapshot?.data[searchProp]) {
      return true;
    } else {
      if(Array.isArray(currentSnapshot.children)) {
        let result = false;

        currentSnapshot.children.every((el) => {
          result = this.recursFindPropertyInData(el, searchProp);
          if(result){
            return false;
          } else {
            return true;
          }
        });
        return result;
      } else {
        return false;
      }
    }
  }

}
