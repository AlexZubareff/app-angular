import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/users';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})

export class AuthorizationComponent implements OnInit, OnDestroy  {
 
  loginText: string = 'Login';
  passText: string = 'Password';
  statusText: string = 'VIP';
  cardText: string = 'Card number';
  authTButtonText: string ;


  login: string;
  password: string;
  cardNumber: string;
  selectedValue: boolean;
  

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
    ) { }
  


  ngOnInit(): void {
    this.authTButtonText = 'Authorization';
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
      login: this.login
    }

    if(this.authService.checkUser(authUser)){
      this.userService.setUser(authUser);
      this.router.navigate(['tickets/tickets-list']);
      // this.messageService.add({severity:'success', summary:'Service Message', detail:'User exists'});
      console.log('auth true');
      
    } else {
      this.messageService.add({severity:'warn', summary:'Service Message', detail:'There is no such User'});
      console.log('auth false');
    }
    
  }

}
