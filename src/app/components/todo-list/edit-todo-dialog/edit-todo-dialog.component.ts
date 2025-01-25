import { inject, Component } from '@angular/core';
import { EditUserDialogComponent } from './../../users-list/edit-user-dialog/edit-user-dialog.component';
import { Todo } from '../../../Interfaces/todo.interface';
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
import {
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatDialogClose } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { User } from '../../../Interfaces/user.interface';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-edit-todo-dialog',
  templateUrl: './edit-todo-dialog.component.html',
  styleUrl: './edit-todo-dialog.component.scss',
  imports: [
    CommonModule,
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
    MatCardModule

  ],
  standalone: true,
})

export class EditTodoDialogComponent {
  readonly data = inject<{todo: Todo}>(MAT_DIALOG_DATA);
  public formtodo = new FormGroup({
    userId: new FormControl(this.data.todo.userId, [
      Validators.required,
      Validators.minLength(3)
    ]),
    id : new FormControl(this.data.todo.id, [
      Validators.required,
      Validators.minLength(3),
    ]),
    title: new FormControl(this.data.todo.title, [
      Validators.required,
      Validators.maxLength(10)
    ]),
    completed: new FormControl(this.data.todo.completed, [
      Validators.required,
      Validators.minLength(2)
    ]),
  });
  get userWidthUpdateFields() {
    return {
      ...this.formtodo.value,
      id: this.data.todo.id,
    };
  }
}
