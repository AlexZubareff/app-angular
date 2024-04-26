import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import {TableModule} from 'primeng/table'
import { StatisticComponent } from './settings/statistic/statistic.component';
import { ChangePasswordComponent } from './settings/change-password/change-password.component';
import { UsersComponent } from './settings/users/users.component';


@NgModule({
  declarations: [
    SettingsComponent,
    StatisticComponent,
    ChangePasswordComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    SettingsModule,
    SettingsRoutingModule,
    FormsModule,
    InputTextModule,
    TabViewModule,
    TableModule,
    ReactiveFormsModule
  ],
  exports: [ChangePasswordComponent]
})
export class SettingsModule { }
