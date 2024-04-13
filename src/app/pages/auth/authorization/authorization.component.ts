import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/users';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { ConfigService } from 'src/app/services/config/config.service';



@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})

export class AuthorizationComponent implements OnInit, OnDestroy  {
 
  loginText: string = 'Логин';
  passText: string = 'Пароль';
  statusText: string = 'VIP';
  cardText: string = 'Номер клубной карты';
  authTButtonText: string ;


  login: string;
  password: string;
  cardNumber: string;
  selectedValue: boolean;

  showCardNumber: boolean;
  

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
    ) { }
  


  ngOnInit(): void {
    this.authTButtonText = 'Войти';
    this.showCardNumber = ConfigService.config.useUserCard;
  }

  ngOnDestroy(): void {
    console.log('destroy');
  }

  vipStatusSelected() {
    console.log('chek');
    
  }

  onAuth(ev: Event): void {

    const authUser: IUser = {
      password: this.password,
      login: this.login,
      cardNumber: this.cardNumber
    }

    if(this.authService.checkUser(authUser)){
      this.userService.setUser(authUser);
      this.userService.setToken('user-private-token');
      window.localStorage.setItem(
          'token',
          'user-private-token'
        );
      this.router.navigate(['tickets/tickets-list']);
      // this.messageService.add({severity:'success', summary:'Service Message', detail:'User exists'});
      console.log('auth true');
      
    } else {
      this.messageService.add({severity:'warn', summary:'Service Message', detail:'There is no such User'});
      console.log('auth false');
    }
    
  }

  onEnter(ev: KeyboardEvent): void {
    console.log(ev.key);
    
    if(ev.key === 'Enter') {
      this.onAuth(ev);
    }
    

  }
}
