import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IConfig } from 'src/app/models/config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  config: IConfig;
  static config: Object;

  constructor(
    private http: HttpClient
  ) { }

  configLoad (): void {
    const jsonFile = `assets/config/config.json`;
    this.http.get(jsonFile).subscribe((data) => {
      if (data && typeof(data) === 'object') {
        ConfigService.config = data;
 
      }
    })
 
  }

  loadPromise() {
    const jsonFile = `assets/config/config.json`;
    const configPromise =  new Promise<void>((resolve, reject) => {
      this.http.get(jsonFile).toPromise().then((response: any ) => {
        if (response && typeof(response) === 'object') {
          ConfigService.config = response;
          const config = ConfigService.config;
          if (config) {
            // set origin host
            resolve();
          } else {
            reject('Ошибка при инициализации конфига - неверный формат '+config);
          }
        } else {
          reject('Ошибка при инициализации конфига - неверный формат ответа '+ response);
        }
      }).catch((response: any) => {
        reject(`Ошибка при загрузки файла '${jsonFile}': ${JSON.stringify(response)}`);
      });
    });
 
    const promiseArr = [configPromise];
    return Promise.all(promiseArr);
  }
}
