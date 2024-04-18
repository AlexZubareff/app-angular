import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/users';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.sass']
})
export class ChangepassComponent implements OnInit {
  user: IUser;
  password: string;
  newPassword: string;
  newPasswordRepeat: string;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.user = this.userService.getUser();
    console.log(this.user);
  }

  changePass(ev: Event): void | boolean {

    this.user = this.userService.getUser();
    console.log(this.user);
    

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
      this.changePass(ev);
    }
    

  }

}
