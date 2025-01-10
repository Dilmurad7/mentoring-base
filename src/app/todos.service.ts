import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from './Interfaces/todo.interface';

@Injectable({ providedIn: 'root' })
export class TodosService {
  private todosSubject$ = new BehaviorSubject<Todo[]>([]);
  todos = this.todosSubject$.asObservable();

  setTodos(todos: Todo[]) {
    this.todosSubject$.next(todos);
  }
  editTodo(editedUser: Todo) {
    this.todosSubject$.next(
      this.todosSubject$.value.map((user) => {
        if (user.id === editedUser.id) {
          return editedUser;
        } else {
          return user;
        }
      })
    );
  }
  deleteTodo(todoId: number) {
    this.todosSubject$.next(
      this.todosSubject$.value.filter((todo) => todoId !== todo.id)
    );
  }
  createTodo(createTodo: Todo) {
    const todoIsExisting = this.todosSubject$.value.find(
      (todoElement) => todoElement.title === createTodo.title
    );
    if (todoIsExisting !== undefined) {
      alert('Такой title уже зарегистрирован');
    } else {
      alert('Новый user добавлен');
    }
    this.todosSubject$.next([...this.todosSubject$.value, createTodo]);
  }
}

// createUser(user: User) {
//   const userIsExisting = this.usersSubject$.value.find(
//     (currentElement) => currentElement.email === user.email
//   );
//   console.log(userIsExisting);
//   if (userIsExisting !== undefined) {
//     alert('Такой email зарегистрирован');
//   } else {
//     alert('Новый user добавлен');
//     this.usersSubject$.next([...this.usersSubject$.value, user]);
//   }
// }
