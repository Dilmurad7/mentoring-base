import { NewUser } from './../../Interfaces/new-user.interface';
import { CreateUserFormComponent } from './../../create-user-form/create-user-form.component';
import { UsersService } from './../../users.service';
import { UsersApiService } from './../../users-api.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserCardComponent } from './user-card/user-card.component';
import { User } from '../../Interfaces/user.interface';
import { publishFacade } from '@angular/compiler';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';
import { CreateUserDialogComponent } from './create-user-dialog/create-user-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { RedDirective } from '../../directives/red.directive';

@Component({
  selector: 'app-user-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  standalone: true,
  imports: [NgFor, UserCardComponent, AsyncPipe, MatButtonModule, RedDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  readonly usersApiService = inject(UsersApiService);
  usersService = inject(UsersService);
  readonly users$ = this.usersService.users$;
  dialog: any;
  readonly createUserDialog = inject(MatDialog);

  constructor() {
    this.usersApiService.getUsers().subscribe((response: User[]) => {
      this.usersService.setUsers(response);
    });
  }

  deleteUser(id: number) {
    this.usersService.deleteUser(id);
  }

  editUser(user: any) {
    this.usersService.editUser({
      ...user,
      company: {
        name: user.companyName,
      },
    });
  }

  public createUser() {
    const dialogRef = this.createUserDialog.open(CreateUserDialogComponent, {
      data: {},
      width: '500px',
      height: '500px',
    });
    dialogRef.afterClosed().subscribe((createdUser: NewUser) => {
      this.usersService.createUser({
        id: new Date().getTime(),
        name: createdUser.name,
        email: createdUser.email,
        website: createdUser.website,
        companyName: createdUser.companyName,
        company: {
          name: createdUser.companyName
        },
      });
    });
  }
  public openDialog(user: User) {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: {
        isEdit: true,
        user: user,
        title: 'Add user',
      },
      width: '500px',
    });

  }
}
