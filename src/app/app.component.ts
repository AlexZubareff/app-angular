import { Component } from '@angular/core';
import { ObservableExampleService } from './services/testing/observable-example.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ticketSales2024';

  constructor(private testing: ObservableExampleService){
    testing.initObservable()
  }

  ngOnInit() {

    // OBSERVABLE

    const myObservable = this.testing.getObservable();

    myObservable.subscribe((data) => {
      // console.log('first myObservable data', data);
    })

    myObservable.subscribe((data) => {
      // console.log('second myObservable data', data);
    });

    // SUBJECT

    const mySubject = this.testing.getSubject();

    mySubject.subscribe((data) => {
      // console.log('first mySubject data: ', data);
    })

    mySubject.subscribe((data) => {
      // console.log('second mySubject data: ', data);
    })

    //send subject data
    mySubject.next('subject value');
    // mySubject.next('subject value');

    //BEHAVIOR_SUBJECT

    const myBehavior = this.testing.getBehaviorSubject();
    myBehavior.subscribe((data) => {
      console.log('first data behaviorSubject: ', data);
    });

    myBehavior.next('NEW data from behaviorSubject');
    myBehavior.next('NEW data_1 from behaviorSubject');

  }
}
