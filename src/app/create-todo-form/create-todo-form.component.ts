import { NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatDialogClose } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInput, MatInputModule } from '@angular/material/input';
import { from } from 'rxjs';

@Component({
  selector: 'app-create-todo-form',
  templateUrl: './create-todo-form.component.html',
  styleUrls: ['./create-todo-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatInput,
    MatFormField,
    MatFormFieldModule,
    MatLabel,
    MatIcon,
    MatError,
    MatDialogClose,
  ],
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
    userId: new FormControl(null, [
      Validators.required,
      Validators.maxLength(11),
    ]),
  });
  public submitTodoform() {
    this.createTodo.emit(this.formtodo.value);
    this.formtodo.reset();
  }

  constructor() {
    this.formtodo.valueChanges.subscribe((formValue) => console.log(formValue));
    console.log(this.formtodo.get('id')?.errors);
  }
}
