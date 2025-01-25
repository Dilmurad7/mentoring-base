import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
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
@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrl: './edit-user-dialog.component.scss',
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
export class EditUserDialogComponent {
  readonly data = inject<{ user: User }>(MAT_DIALOG_DATA);
  public form = new FormGroup({
    name: new FormControl(this.data.user.name, [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl(this.data.user.email, [
      Validators.required,
      Validators.email,
    ]),
    website: new FormControl(this.data.user.website, [
      Validators.required,
      Validators.minLength(3),
    ]),
    companyName: new FormControl(this.data.user.company.name, [
      Validators.required,
      Validators.minLength(3),
    ]),
  });
  get userWidthUpdateFields() {
    return {
      ...this.form.value,
      id: this.data.user.id,
    };
  }
}
