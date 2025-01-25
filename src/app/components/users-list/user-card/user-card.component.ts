import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { CreateUserDialogComponent } from '../create-user-dialog/create-user-dialog.component';
import { DeleteUserDialogComponent } from '../delete-user-dialog/delete-user-dialog.component';
import { User } from '../../../Interfaces/user.interface';
import { RemoveHyphensPipe } from '../../../pipes/removeHyphens.pipe';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RedDirective } from '../../../directives/red.directive';
import { HoverShadowDirective } from '../../../directives/cartshadow.directive';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
  standalone: true,
  imports: [MatDialogModule, RemoveHyphensPipe, MatSnackBarModule, RedDirective, HoverShadowDirective, MatIcon, MatTooltipModule, MatCardModule, MatCardModule,MatButtonModule, MatCardModule,],
})
export class UserCardComponent {
  @Input()
  public user!: User | any;
  @Output()
  public deleteUser = new EventEmitter<number>();
  @Output()
  public editUser = new EventEmitter();
  readonly dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar)
  public OpenDeleteDialog(): void {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      width: '700px',
      data: { user: this.user },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result) {
        this.deleteUser.emit(this.user.id);
        this.snackBar.open("Пользователь удален", '', {
          duration: 3000
        } )
        console.log('Пользователь удален', this.user.id);
      } else
      this.snackBar.open("Отмена удаления", '', {
        duration: 3000
      } )
    });
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '700px',
      data: { user: this.user },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result) {
        this.deleteUser.emit(this.user.id);
        this.snackBar.open("Пользователь редактирован", '', {
          duration: 3000
        } )
        console.log('Пользователь удален', this.user.id);
      } else
      this.snackBar.open("Отмена редактирования", '', {
        duration: 3000
      } )
    });}
}
