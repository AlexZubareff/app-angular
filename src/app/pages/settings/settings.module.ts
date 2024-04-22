import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { StatisticComponent } from './statistic/statistic.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import {TableModule} from 'primeng/table'


@NgModule({
  declarations: [
    SettingsComponent,
    StatisticComponent
  ],
  imports: [
    CommonModule,
    SettingsModule,
    SettingsRoutingModule,
    FormsModule,
    InputTextModule,
    TabViewModule,
    TableModule
  ]
})
export class SettingsModule { }
