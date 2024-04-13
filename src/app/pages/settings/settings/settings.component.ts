import { Component, OnInit } from '@angular/core';
import { Subject, Subscription, take } from 'rxjs';
import { ISettings } from 'src/app/models/settings';
import { SettigsService } from 'src/app/services/settings/settigs.service';
import { ObservableExampleService } from 'src/app/services/testing/observable-example.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {

  // private subjectScope: Subject<string> = this.testing.getSubject();
  private subjectUnsubscribe: Subscription;
  settingsData: Subscription;
  settingsDataSubject: Subscription;



  constructor(
    private testing: ObservableExampleService,
    private settingsService: SettigsService 
    ){
    testing.initObservable()
  }

  ngOnInit(): void {

    // this.subjectScope = this.testing.getSubject();


    // this.subjectScope.subscribe((data) => {
    //   console.log('settings first subjectScope data: ', data);
    // })

    //send subject data

  //  this.subjectScope.next('settings subject value');


  //  this.subjectUnsubscribe = this.subjectScope.subscribe((data: string) => {
  //   console.log('data: ', data)
  // })

  // this.subjectScope.next('subData');



  //settingsData observable
  this.settingsData = this.settingsService.loadUserSettings().subscribe((data) => {
    console.log('settings data: ', data);
  })

  // settings data subject
  this.settingsDataSubject = this.settingsService.getSettingsSubjectObservable().pipe(take(1)).subscribe(
    (data) => {
      console.log('settings data from subject: ', data);
    })
  }

  ngOnDestroy(){
    this.settingsData .unsubscribe()
  }


}
