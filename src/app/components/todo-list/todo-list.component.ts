import { CreateTodoDialogComponent } from './create-todo-dialog/create-todo-dialog.component';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgFor, AsyncPipe } from '@angular/common';
import { TodoCardComponent } from './todo-card/todo-card.component';
import { TodosApiService } from '../../todos-api.service';
import { TodosService } from '../../todos.service';
import { CreateTodoFormComponent } from '../../create-todo-form/create-todo-form.component';
import { Todo } from '../../Interfaces/todo.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DeleteTodoDialogComponent } from './delete-todo-dialog/delete-todo-dialog.component';
import { RedDirective } from '../../directives/red.directive';


@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [NgFor, TodoCardComponent, AsyncPipe, MatButtonModule, RedDirective],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent {
  readonly todosApiService = inject(TodosApiService);
  readonly TodosService = inject(TodosService);
  readonly todos$ = this.TodosService.todos;
  readonly createTodoDialog = inject(MatDialog);

  constructor() {
    this.todosApiService.getTodos().subscribe((response: any) => {
      this.TodosService.setTodos(response.slice(0, 15));
      this.TodosService.todos.subscribe((todos) => console.log(todos));
    });
  }

  deleteTodo(id: number) {
    this.TodosService.deleteTodo(id);
  };

  editTodo(todo: Todo) {
    this.TodosService.editTodo({
      ...todo,
    })
    }
  public createTodo() {
    const dialogRef = this.createTodoDialog.open(CreateTodoDialogComponent, {
      data: {},
      width: '500px',
      height: '500px',
    });
    dialogRef.afterClosed().subscribe((createdTodo: Todo) => {
      this.TodosService.createTodo({
        id: new Date().getTime(),
        title: createdTodo.title,
        completed: createdTodo.completed,
        userId: createdTodo.userId,
      });
    });
  }
}
