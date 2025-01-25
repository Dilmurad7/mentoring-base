import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { User } from '../../../Interfaces/user.interface';
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

@Component({
  selector: 'app-create-user-dialog',
  templateUrl: './create-user-dialog.component.html',
  styleUrl: './create-user-dialog.component.scss',
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
  ],
})
export class CreateUserDialogComponent {
  public readonly data = inject<User>(MAT_DIALOG_DATA);
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
    // this.createUser.emit(this.form.value);
    this.form.reset();
  }

  constructor() {
    this.form.valueChanges.subscribe((formValue) => console.log(formValue));
    console.log(this.form.get('name')?.errors);
  }
}
