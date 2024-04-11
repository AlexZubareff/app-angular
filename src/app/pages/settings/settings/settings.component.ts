import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ObservableExampleService } from 'src/app/services/testing/observable-example.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {

  private subjectScope: Subject<string> = this.testing.getSubject();
  private subjectUnsubscribe: Subscription;



  constructor(private testing: ObservableExampleService){
    testing.initObservable()
  }

  ngOnInit(): void {

    this.subjectScope = this.testing.getSubject();


    // this.subjectScope.subscribe((data) => {
    //   console.log('settings first subjectScope data: ', data);
    // })

    //send subject data

  //  this.subjectScope.next('settings subject value');


   this.subjectUnsubscribe = this.subjectScope.subscribe((data: string) => {
    console.log('data: ', data)
  })

  // this.subjectScope.next('subData');
  }

  ngOnDestroy(){
    this.subjectUnsubscribe .unsubscribe()
  }


}
