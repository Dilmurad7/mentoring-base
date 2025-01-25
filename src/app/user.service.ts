import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface IUser {
name: string,
email: string,
isAdmin: boolean | null;
}
@Injectable({providedIn: 'root'})
export class UserService {
private readonly userSubject$ = new BehaviorSubject<IUser | null >(null)
public readonly user$ = this.userSubject$.asObservable();

private user: IUser = {
  name: 'Ilnur',
  email: 'Ряжапов',
  isAdmin: null
}

loginAsAdmin() {
  this.userSubject$.next({...this.user, isAdmin: true});
  console.log('залогинились как админ', this.userSubject$.value);
}
loginAsUser() {
  this.userSubject$.next({...this.user, isAdmin: false})
  console.log('залогинились как юзер', this.userSubject$.value);
}
get isAdmin() {
  return this.userSubject$.value?.isAdmin
}
logout() {
  this.userSubject$.next(null);
  console.log(this.userSubject$);
}
}
