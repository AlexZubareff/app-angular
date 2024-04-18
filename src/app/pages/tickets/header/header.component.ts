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
  public weekDay : string = this.getWeekDay();
  public data = new Date().toLocaleString('ru', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });;
  


  @Input() menuType: IMenuType;

  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.items = [
      {
          label: 'Билеты',
          routerLink: ['tickets-list']
      },
      {
        label: 'Заказы',
        routerLink: ['orders']
      },
      {
        label: 'Настройки',
        routerLink:['settings'],
      },
      {
        label: 'Выход',
        icon:'pi pi-fw pi-power-off',
        command: () => this.authService.delUserFromLocalstorage(),
        routerLink: ['/auth']
    },


  ];
  
  this.user = this.userService.getUser();
  
}

ngOnChanges(ev: SimpleChanges): void {
  // this.settingsActive = this.menuType?.type === "extended";
  // this.items = this.initMenuItems();
}

initMenuItems(): MenuItem[] {
  return [
    {
      label: 'Билеты',
      routerLink:['tickets-list']
    },
    {
      label: 'Заказы',
      routerLink: ['orders']
    },
    {
      label: 'Настройки',
      routerLink:['settings'],
      // visible: this.settingsActive
    },
    {
      label: 'Выход',
      icon:'pi pi-fw pi-power-off',
      command: () => this.authService.delUserFromLocalstorage(),
      routerLink:['/auth']
    },

  ];
}

getWeekDay(){
  let index = new Date().getDay()
  let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  return days[index];
}


  }


