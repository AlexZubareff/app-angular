import { Injectable } from '@angular/core';
import {IUser} from '../../models/users';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usersStorage: IUser[] = [];

  constructor() {}

  checkUser(user: IUser): boolean {
    const isUserInLocalStorage = window.localStorage.getItem(`user-${user.login}`);
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
    const isUserExists = this.usersStorage.find(
      (el) => el.login === user.login
    );
    if (!isUserExists && user?.login) {
      this.usersStorage.push(user);
      console.log('setUser usersStorage: ', this.usersStorage);
    }
  }
}
