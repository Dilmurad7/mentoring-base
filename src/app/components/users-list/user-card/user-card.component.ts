import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
  MatDialogModule,
} from '@angular/material/dialog';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { CreateUserDialogComponent } from '../create-user-dialog/create-user-dialog.component';
import { DeleteUserDialogComponent } from '../delete-user-dialog/delete-user-dialog.component';
import { User } from '../../../Interfaces/user.interface';
import { RemoveHyphensPipe } from '../../../pipes/removeHyphens.pipe';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
  standalone: true,
  imports: [MatDialogModule, RemoveHyphensPipe],
})
export class UserCardComponent {
  @Input()
  user: User | any;

  @Output()
  deleteUser = new EventEmitter();
  @Output()
  editUser = new EventEmitter();
  readonly dialog = inject(MatDialog);
  public OpenDeleteDialog(): void {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      width: '700px',
      data: { user: this.user },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result !== undefined) {
      }
    });
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: { user: this.user },
    });

    dialogRef.afterClosed().subscribe((editResult) => {
      console.log('Модалка закрылась', 'значение формы: ', editResult);
      if (!editResult) return;
      this.editUser.emit(editResult);
    });
  }

  onDeleteUser(userId: number) {
    this.deleteUser.emit(userId);
  }
}
