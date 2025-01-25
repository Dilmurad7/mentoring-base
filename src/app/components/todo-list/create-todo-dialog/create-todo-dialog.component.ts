import { Component, inject } from '@angular/core';
import { Todo } from '../../../Interfaces/todo.interface';
import {
  MatError,
  MatFormField,
  MatInputModule,
  MatLabel,
} from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DIALOG_DATA,  MatDialogModule  } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-create-todo-dialog',
  templateUrl: './create-todo-dialog.component.html',
  styleUrl:'./create-todo-dialog.component.scss',
  standalone: true,
  imports: [
MatDialogModule,
MatFormField,
MatLabel,
MatError,
MatIcon,
ReactiveFormsModule,
MatFormFieldModule,
MatInputModule,
NgIf,
  ],
})
export class CreateTodoDialogComponent{
  readonly data = inject<Todo>(MAT_DIALOG_DATA);
  public formtodo = new FormGroup({
    id: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    userId: new FormControl('', [Validators.required]),
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    completed: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  public submitForm() {
    // this.createUser.emit(this.form.value);
    this.formtodo.reset();
  }
}
