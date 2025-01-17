import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatDialogClose } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { User } from '../../../Interfaces/user.interface';
import { Todo } from '../../../Interfaces/todo.interface';
@Component({
  selector: 'app-create-todo-dialog',
  templateUrl: './create-todo-dialog.component.html',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatInput,
    MatFormField,
    MatFormFieldModule,
    MatLabel,
    MatIcon,
    MatError,
    MatDialogClose,
  ],
  standalone: true,
})
@Component({
  selector: 'app-create-todo-dialog',
  standalone: true,
  imports: [],
  templateUrl: './create-todo-dialog.component.html',
  styleUrl: './create-todo-dialog.component.scss',
})
export class CreateTodoDialogComponent {
  readonly data = inject<{ todo: Todo }>(MAT_DIALOG_DATA);
  public form = new FormGroup({
    id: new FormControl(this.data.todo.id, [
      Validators.required,
      Validators.minLength(3),
    ]),
    user: new FormControl(this.data.todo.userId, [Validators.required]),
    title: new FormControl(this.data.todo.title, [
      Validators.required,
      Validators.minLength(2),
    ]),
    completed: new FormControl(this.data.todo.completed, [
      Validators.required,
      Validators.minLength(3),
    ]),
  });
  formtodo: any;
  get todoWidthUpdateFields() {
    return {
      ...this.form.value,
      id: this.data.todo.id,
    };
  }
}
