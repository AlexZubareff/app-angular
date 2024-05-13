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
import { FilterPipe } from './pipes/filter.pipe';
import { TourLoaderComponent } from './tour-loader/tour-loader.component';


@NgModule({
  declarations: [
    SettingsComponent,
    StatisticComponent,
    ChangePasswordComponent,
    UsersComponent,
    FilterPipe,
    TourLoaderComponent
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
  exports: [
    ChangePasswordComponent,
    UsersComponent
  ]
})
export class SettingsModule { }
