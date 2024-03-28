import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { IMenuType } from 'src/app/models/menuType';
import { IUser } from 'src/app/models/users';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private settingsActive = false;
  public user: IUser;
  items: MenuItem[];

  @Input() menuType: IMenuType;

  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.items = [
      {
          label: 'Tikets',
          routerLink: ['tickets-list']
      },
      {
        label: 'Exit',
        command: () => this.authService.delUserFromLocalstorage(this.user),
        routerLink: ['/auth']
    },


  ];
  
  this.user = this.userService.getUser();
  
}

ngOnChanges(ev: SimpleChanges): void {
  this.settingsActive = this.menuType?.type === "extended";
  this.items = this.initMenuItems();
}

initMenuItems(): MenuItem[] {
  return [
    {
      label: 'Tikets',
      routerLink:['tickets-list']
    },
    {
      label: 'Settings',
      routerLink:['/settings'],
      visible: this.settingsActive
    },
    {
      label: 'Exit',
      routerLink:['/auth']
    },

  ];
}




  }


