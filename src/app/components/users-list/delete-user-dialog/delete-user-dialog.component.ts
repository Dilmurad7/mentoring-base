import { User } from './../../../Interfaces/user.interface';
import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogClose,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-delete-user-dialog',
  standalone: true,
  imports: [MatDialogModule, MatDialogClose, MatIcon,],
  templateUrl: './delete-user-dialog.component.html',
  styleUrl: './delete-user-dialog.component.scss',
})
export class DeleteUserDialogComponent {
  public readonly data = inject<{ user: User }>(MAT_DIALOG_DATA);
  readonly dialog = inject(MatDialog);
  constructor() {
    console.log('Данные которые пришли в модалку', this.data);
  }
}
