import { NewUser } from './../../Interfaces/new-user.interface';
import { CreateUserFormComponent } from './../../create-user-form/create-user-form.component';
import { UsersService } from './../../users.service';
import { UsersApiService } from './../../users-api.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserCardComponent } from './user-card/user-card.component';
import { User } from '../../Interfaces/user.interface';

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
}
