import { Injectable } from '@angular/core';
import { Observable, delay, map, of, switchMap, withLatestFrom } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { USERS } from 'src/app/shared/users';

export interface SettingsUsers {
  fio?: string,
  citizenship?: string,
  role?: string,
  birthDate?:string
}


@Injectable({
  providedIn: 'root'
})
export class SettingUsersService {

  constructor(private userService: UserService) { }


  getUser(): Observable<SettingsUsers[]> {
    const usersArr: SettingsUsers[] = Array.isArray(USERS) ? [...USERS] : [];

    return of(usersArr).pipe (
      //get my users
      withLatestFrom(this.userService.userBehSubject$),

      switchMap(([users, ownUser]) => {
        const newUser = {fio: ownUser?.login || ''}
        return of(users.concat([newUser]));
      }),

      // checks

      map((arr) => arr.filter((el: SettingsUsers) => el.fio)),
      map((arr) => arr.concat(arr)),

      // add delay
      delay(300)
    )
  }
}
