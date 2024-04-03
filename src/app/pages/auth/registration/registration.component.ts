import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { IUser, USER_LOCALSTORAGE_NAME } from 'src/app/models/users';
import { AuthService } from 'src/app/services/auth/auth.service';

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

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    
  ) {}

  ngOnInit(): void {}

  register(ev: Event): void | boolean {

    const newUser: IUser = {
      login: this.login,
      password: this.password,
      email: this.email,
      cardNumber: this.cardNumber,
    };

    if (this.password !== this.passwordRepeat) {
      this.messageService.add({
        severity: 'error',
        summary: 'Service Message',
        detail: 'Пароли не совпадают',
      });
      return false;
    }



    if (!this.authService.isUserExists(newUser)) {
      this.authService.setUser(newUser);

      if (this.saveLocalStorageValue) {
        window.localStorage.setItem(
          USER_LOCALSTORAGE_NAME,
          JSON.stringify(newUser)
        );
        
        console.log(window.localStorage.getItem('current user'));
      }

      this.messageService.add({
        severity: 'success',
        summary: 'Service Message',
        detail: 'Пользователь зарегестрирован!',
      });

      
      console.log('saveLocalStorageValue: ', this.saveLocalStorageValue);
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Service Message',
        detail: 'Пользоваеть существует!',
      });
    }
  }
}
