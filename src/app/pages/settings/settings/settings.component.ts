import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject, Subscription, take, takeUntil } from 'rxjs';
import { ISettings } from 'src/app/models/settings';
import { IUser, USER_LOCALSTORAGE_NAME } from 'src/app/models/users';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SettigsService } from 'src/app/services/settings/settigs.service';
import { ObservableExampleService } from 'src/app/services/testing/observable-example.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {
  isTabCaching: boolean = false;
  // private subjectScope: Subject<string> = this.testing.getSubject();

  // private subjectUnsubscribe: Subscription;
  // settingsData: Subscription;
  // settingsDataSubject: Subscription;

  private subjectForUnsubscribe = new Subject();
  private user: IUser;

  password: string;
  newPassword: string;
  newPasswordRepeat: string;


  constructor(
    private testing: ObservableExampleService,
    private settingsService: SettigsService,
    private userService: UserService,
    private authService: AuthService,
    private messageService: MessageService
    ){
    testing.initObservable()
  }

  ngOnInit(): void {

    this.user = this.userService.getUser();
    console.log(this.user);

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
  this.settingsService.loadUserSettings().pipe(takeUntil(this.subjectForUnsubscribe)).subscribe((data) => {
    console.log('settings data: ', data);
  })

  // settings data subject
  this.settingsService.getSettingsSubjectObservable().pipe(takeUntil(this.subjectForUnsubscribe)).subscribe(
    (data) => {
      console.log('settings data from subject: ', data);
    })
  }



  ngOnDestroy(){
    this.subjectForUnsubscribe.next(true);
    this.subjectForUnsubscribe.complete();
  }


  changePass(ev: Event): void | boolean {


    this.user = this.userService.getUser();
    console.log(this.user);

    const changeUser: IUser = {
      login: this.user.login,
      password: this.newPassword,
      // cardNumber: this.user.cardNumber
    };
    
    const pass = this.password;
    const newPass = this.newPassword;
    const newPassRepeat = this.newPasswordRepeat;
    // console.log('pass: ', pass);
    // console.log('newPass: ', newPass);
    // console.log('newPassRepeat: ', newPassRepeat);
 
    // console.log('USER STORAGE: ', this.authService.usersStorage);
    

    // if(pass === this.user.password) {
      
    //   if(newPass === newPassRepeat) {

    //    this.authService.updatePassUser(this.user.login, this.newPassword)
        
    //   }
    // console.log('USER STORAGE: ', this.authService.usersStorage);

    // }




    if (pass !== this.user.password) {
      this.messageService.add({
        severity: 'error',
        summary: 'Service Message',
        detail: 'Текущий пароль указан не верно',
      });
      return false;
    } else if (newPass !== newPassRepeat) {
      this.messageService.add({
        severity: 'error',
        summary: 'Service Message',
        detail: 'Пароли не совпадают',
      });
      return false;
    } else {
      this.authService.updatePassUser(this.user.login, this.newPassword);

      if(window.localStorage.getItem(USER_LOCALSTORAGE_NAME)){
        window.localStorage.removeItem(USER_LOCALSTORAGE_NAME);
        window.localStorage.setItem(
          USER_LOCALSTORAGE_NAME,
          JSON.stringify(changeUser)
      );
        }
      
        this.messageService.add({
        severity: 'success',
        summary: 'Service Message',
        detail: 'Пароль успешно изменен!',
      });
    }

    

    this.user = this.userService.getUser();
    console.log(this.user);

    // if (!this.authService.isUserExists(newUser)) {
    //   this.authService.setUser(newUser);

    //   if (this.saveLocalStorageValue) {
    //     window.localStorage.setItem(
    //       USER_LOCALSTORAGE_NAME,
    //       JSON.stringify(newUser)
    //     );
        
    //     console.log(window.localStorage.getItem('current user'));
    //   }

    //   this.messageService.add({
    //     severity: 'success',
    //     summary: 'Service Message',
    //     detail: 'Пользователь зарегестрирован!',
    //   });

      
    //   console.log('saveLocalStorageValue: ', this.saveLocalStorageValue);
    // } else {
    //   this.messageService.add({
    //     severity: 'warn',
    //     summary: 'Service Message',
    //     detail: 'Пользоваеть существует!',
    //   });
    // }

  }

  onEnter(ev: KeyboardEvent): void {
    console.log(ev.key);
    
    if(ev.key === 'Enter') {
      this.changePass(ev);
    }
    

  }


}
