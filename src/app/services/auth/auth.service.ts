import { Injectable } from '@angular/core';
import {IUser, USER_LOCALSTORAGE_NAME} from '../../models/users';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usersStorage: IUser[] = [];


  constructor() {}

  checkUser(user: IUser): boolean {
    const isUserInLocalStorage = window.localStorage.getItem(USER_LOCALSTORAGE_NAME);
    const isUserExists = this.usersStorage.find(
      (el) => el.login === user.login
    );

    if (isUserInLocalStorage) {
      let userInLocalStorage: IUser = JSON.parse(isUserInLocalStorage);

      console.log('checkUser userInLocalStorage: ', isUserInLocalStorage);

      return userInLocalStorage.password === user.password;

    } else {
      if (isUserExists) {

        console.log('checkUser usersInStorage: ', this.usersStorage);

        return isUserExists.password === user.password;
      }
    }

    return false;
  }

  isUserExists(user: IUser): boolean {
    const isUserExists = this.usersStorage.find(
      (el) => el.login === user.login
    );
    return !!isUserExists;
  }

  setUser(user: IUser): void {
    // const isUserExists = this.usersStorage.find(
    //   (el) => el.login === user.login
    // );
    // if (!isUserExists && user?.login) {
    //   this.usersStorage.push(user);
    //   console.log('setUser usersStorage: ', this.usersStorage);
    // }
    if (user) {
      this.usersStorage.push(user);
      console.log('setUser usersStorage: ', this.usersStorage);
    }


  }

  delUserFromLocalstorage(user: IUser){
    window.localStorage.removeItem(USER_LOCALSTORAGE_NAME);
    // console.log('Текущий пользователь: ',isUserInLocalStorage);
    
  }

}
