import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-todo-form',
  templateUrl: './create-todo-form.html',
  styleUrls: ['./create-todo-form.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, MatButtonModule],
})
export class CreateTodoFormComponent {
  @Output()
  createTodo = new EventEmitter();
  public formtodo = new FormGroup({
    id: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    title: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
    ]),
    completed: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
    userId: new FormControl(null, [Validators.maxLength(11)]),
  });
  public submitTodoform(): void {
    this.createTodo.emit(this.formtodo.value);
    this.formtodo.reset();
  }

  constructor() {
    this.formtodo.valueChanges.subscribe((formValue) => console.log(formValue));

    console.log(this.formtodo.get('id')?.errors);
  }
}
