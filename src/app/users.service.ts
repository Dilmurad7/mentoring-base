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
    console.log(userIsExisting);
    if (userIsExisting !== undefined) {
      alert('Такой email зарегистрирован');
    } else {
      alert('Новый user добавлен');
      this.usersSubject$.next([...this.usersSubject$.value, user]);
    }
  }
}
