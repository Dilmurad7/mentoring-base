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

@Component({
  selector: 'app-user-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  standalone: true,
  imports: [NgFor, UserCardComponent, AsyncPipe, CreateUserFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  readonly usersApiService = inject(UsersApiService);
  usersService = inject(UsersService);
  readonly users$ = this.usersService.users$;
  dialog: any;

  constructor() {
    this.usersApiService.getUsers().subscribe((response: User[]) => {
      this.usersService.setUsers(response);
    });

    // this.usersApiService.getUsers().subscribe((response: User[]) => {
    //   this.usersService.setUsers(response);
    //   console.log(response);
    // });
    // this.usersService.users$.subscribe((users) => console.log(users));
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

  public createUser(formData: NewUser) {
    this.usersService.createUser({
      id: new Date().getTime(),
      name: formData.name,
      email: formData.email,
      website: formData.website,
      company: {
        name: formData.companyName,
      },
    });
    console.log('ДАННЫЕ ФОРМЫ', event);
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
    //   dialogRef.afterClosed().subscribe((result) => {
    //     if (user) {
    //       this.usersService.updateUser(user);
    //     } else {
    //       this.usersService.AddUser(result);
    //     }
    //   });
    // }
  }
}
