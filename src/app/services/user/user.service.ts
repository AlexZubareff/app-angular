import { Injectable } from '@angular/core';
import { IUser, USER_LOCALSTORAGE_NAME } from 'src/app/models/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: IUser;
  
  constructor() { }

  getUser():IUser {
    if(this.user) {
      return this.user;
    } else {
      const userFromLocalStorage = JSON.parse(localStorage.getItem(USER_LOCALSTORAGE_NAME) || '')
      return userFromLocalStorage;
    }
    
    
  }

  setUser(user: IUser) {
    if(user) {
      this.user = user;
    }
  }

}
