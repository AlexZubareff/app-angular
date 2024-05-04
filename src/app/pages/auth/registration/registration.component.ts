import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ServerError } from 'src/app/models/errors';
import { IUser, USER_LOCALSTORAGE_NAME } from 'src/app/models/users';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ConfigService } from 'src/app/services/config/config.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  login: string;
  password: string;
  passwordRepeat: string;
  email: string;
  cardNumber: string;
  saveLocalStorageValue: boolean;
  showCardNumber: boolean;


  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private http: HttpClient 
      ) {}

  ngOnInit(): void {
    this.showCardNumber = ConfigService.config.useUserCard;
  }

  register(ev: Event): void | boolean {

    const newUser: IUser = {
      login: this.login,
      password: this.password,
      email: this.email,
      cardNumber: this.cardNumber,
    };

    const testUser: any = {
      "name": "Test",
      "age": 22,
    };

    this.http.post<IUser>('http://localhost:3000/users/', newUser).subscribe((data)=>{

    if (this.password !== this.passwordRepeat) {
      this.messageService.add({
        severity: 'error',
        summary: 'Service Message',
        detail: 'Пароли не совпадают',
      });
    }

      if (this.saveLocalStorageValue) {
        window.localStorage.setItem(
          USER_LOCALSTORAGE_NAME + '_' + newUser.login,
          JSON.stringify(newUser)
        );
        
        // console.log(window.localStorage.getItem('current user'));
      }

      this.messageService.add({
        severity: 'success',
        summary: 'Service Message',
        detail: 'Пользователь зарегестрирован!',
      });

      
      // console.log('saveLocalStorageValue: ', this.saveLocalStorageValue);
    }, (err: HttpErrorResponse) => {
      console.log('err: ', err);
      const serverError = <ServerError>err.error;
      this.messageService.add({
        severity: 'warn',
        summary: 'Service Message',
        detail: serverError.errorText,
      });
    }

  )

    // if (this.password !== this.passwordRepeat) {
    //   this.messageService.add({
    //     severity: 'error',
    //     summary: 'Service Message',
    //     detail: 'Пароли не совпадают',
    //   });
    //   return false;
    // }



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
      this.register(ev);
    }
    

  }
}
