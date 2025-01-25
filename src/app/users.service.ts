import { Injectable } from '@angular/core';
import { User } from './Interfaces/user.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsersService {

  private usersSubject$ = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject$.asObservable();
  setUsers(users: User[]) {
    this.usersSubject$.next(users);
  }
  deleteUser(id: number) {
    this.usersSubject$.next(
      this.usersSubject$.value.filter((item) => item.id !== id)
    );
  }
  editUser(editUser: User) {
    this.usersSubject$.next(
      this.usersSubject$.value.map((user) => {
        if (user.id === editUser.id) {
          return editUser;
        } else {
          return user;
        }
      })
    );
  }

  createUser(user: User) {
    const userIsExisting = this.usersSubject$.value.find(
      (currentElement) => currentElement.email === user.email
    );
    if (userIsExisting !== undefined) {
      alert('Такой email зарегистрирован');
    } else {
      this.usersSubject$.next([...this.usersSubject$.value, user]);
      setTimeout(() => {
        alert('Новый user добавлен');
      }, 0);
    }
  }
}
