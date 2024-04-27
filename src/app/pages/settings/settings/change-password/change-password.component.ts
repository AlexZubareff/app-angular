import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subject, Subscription, take, takeUntil } from 'rxjs';
import { ISettings } from 'src/app/models/settings';
import { IUser, USER_LOCALSTORAGE_NAME } from 'src/app/models/users';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SettigsService } from 'src/app/services/settings/settigs.service';
import { ObservableExampleService } from 'src/app/services/testing/observable-example.service';
import { UserService } from 'src/app/services/user/user.service';
import { createPasswordStrengthValidator } from '../../validators/password';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  private subjectForUnsubscribe = new Subject();
  private user: IUser;

  changePasswordForm: FormGroup;

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

    this.changePasswordForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6), createPasswordStrengthValidator()]),
      newPasswordRepeat: new FormControl('', [Validators.required, Validators.minLength(6), createPasswordStrengthValidator()]),

    });



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

  // this.settingsService.loadUserSettings().pipe(takeUntil(this.subjectForUnsubscribe)).subscribe((data) => {
  //   console.log('settings data: ', data);
  // })

  // settings data subject

  // this.settingsService.getSettingsSubjectObservable().pipe(takeUntil(this.subjectForUnsubscribe)).subscribe(
  //   (data) => {
  //     console.log('settings data from subject: ', data);
  //   })

  }

  ngOnDestroy(){
    // this.subjectForUnsubscribe.next(true);
    // this.subjectForUnsubscribe.complete();
  }


  onSubmit() {}

  changePass(): void | boolean {

const pass = this.changePasswordForm.get('password')?.value;
const newPass = this.changePasswordForm.get('newPassword')?.value;
const newPassRepeat = this.changePasswordForm.get('newPasswordRepeat')?.value;



    this.user = this.userService.getUser();
    console.log(this.user);

    const changeUser: IUser = {
      login: this.user.login,
      password: newPass,
      // cardNumber: this.user.cardNumber
    };
    
    // const pass = this.password;
    // const newPass = this.newPassword;
    // const newPassRepeat = this.newPasswordRepeat;

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
      this.authService.updatePassUser(this.user.login, newPass);

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

    

  }

  onEnter(ev: KeyboardEvent): void {
    console.log(ev.key);
    
    if(ev.key === 'Enter') {
      this.changePass();
    }
    

  }
}
