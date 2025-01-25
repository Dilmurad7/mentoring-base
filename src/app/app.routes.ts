import { Routes, CanActivateFn } from '@angular/router';
import { UsersListComponent } from './components/users-list/users-list.component';
import { HomeComponent } from './components/home/home.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { AdminComponent } from './admin/admin.component';
import { authGuard } from './Guards/auth.guard';

export const routes: Routes = [
  { path: 'users', component: UsersListComponent },
  { path: '', component: HomeComponent },
  { path: 'todos', component: TodoListComponent },
  { path: 'admin', component: AdminComponent, canActivate: [authGuard] },
];
