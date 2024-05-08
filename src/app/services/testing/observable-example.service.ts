import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObservableExampleService {

  private myBehaviopSubject = new BehaviorSubject<string>('some data of BehaviorSubject');
  private mySubject = new Subject<string>();
  private myOservable = new Observable<string>((subscriber => {
    setTimeout(() => {
      subscriber.next('someValue');
    }, 3000)
  }))

  constructor() { }

  initObservable(): void {
    const observable = new Observable((subscriber => {
      subscriber.next(4);
      subscriber.next(5);
      setTimeout(() => {
        subscriber.next('asyncData');
        subscriber.error('some error here');
      },2000)
    }))
    observable.subscribe((data) => {
      // console.log('observable data: ', data);
      
    }, (error => {
      // console.log('error: ', error);
      
    }))
  }

  getObservable(): Observable<string> {
    return this.myOservable;
  }

  getSubject(): Subject<string> {
    return this.mySubject;
  }

  getBehaviorSubject(): BehaviorSubject<string> {
    return this.myBehaviopSubject;
  }
}
