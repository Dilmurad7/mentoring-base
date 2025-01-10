import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgFor, AsyncPipe } from '@angular/common';
import { TodoCardComponent } from './todo-card/todo-card.component';
import { TodosApiService } from '../../todos-api.service';
import { TodosService } from '../../todos.service';
import { CreateTodoFormComponent } from '../../create-todo-form/create-todo-form.component';
import { Todo } from '../../Interfaces/todo.interface';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [NgFor, TodoCardComponent, AsyncPipe, CreateTodoFormComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent {
  readonly todosApiService = inject(TodosApiService);
  readonly TodosService = inject(TodosService);

  constructor() {
    this.todosApiService.getTodos().subscribe((response: any) => {
      this.TodosService.setTodos(response.slice(0, 15));
      this.TodosService.todos.subscribe((todos) => console.log(todos));
    });
  }

  deleteTodo(id: any) {
    this.TodosService.deleteTodo(id);
  }
  public createTodo(formData: Todo) {
    this.TodosService.createTodo({
      id: formData.id,
      title: formData.title,
      completed: formData.completed,
      userId: formData.userId,
    });
    console.log('Данные формы', formData);
  }
}
