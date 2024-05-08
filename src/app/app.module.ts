import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RestInterceptorsService } from './services/interceptors/rest-interceptors.service';
import { ConfigService } from './services/config/config.service';


const initializeApp = (config: ConfigService)  => {
  return () => config.loadPromise().then(() => {
    // console.log('---CONFIG LOADED--', ConfigService.config)
  });
}


@NgModule({
  declarations: [
    AppComponent,
   

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule
    
  ],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigService], multi: true
    },
    {provide: HTTP_INTERCEPTORS, useClass: RestInterceptorsService, multi: true},
  ],
  bootstrap: [AppComponent]
})





export class AppModule { 

}
