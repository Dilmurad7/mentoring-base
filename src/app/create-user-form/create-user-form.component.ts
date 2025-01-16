import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
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
import { MatIcon } from '@angular/material/icon';
import { MatDialogClose } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-create-user-form',
  templateUrl: './create-user-form.html',
  styleUrl: './create-user-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
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
})
export class CreateUserFormComponent {
  @Output()
  createUser = new EventEmitter();
  public form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    website: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    companyName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  public submitForm() {
    this.createUser.emit(this.form.value);
    this.form.reset();

  }

  constructor() {
    this.form.valueChanges.subscribe((formValue) => console.log(formValue));
    console.log(this.form.get('name')?.errors);
  }
}
