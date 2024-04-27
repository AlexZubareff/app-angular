import { Component, OnInit } from '@angular/core';
import { SettingUsersService } from '../../services/setting-users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: any[];
  searchValue: string;
  asyncUsers = this.userSettingsService.getUser();

  constructor(private userSettingsService: SettingUsersService) { }

  ngOnInit(): void {
  }

}


