import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, inject, Inject, Injectable } from '@angular/core';
import { UsersListComponent } from '../users-list/users-list.component';
import { RouterLink } from '@angular/router';
import { HoverHighlightDirective } from '../../directives/hoverCart.directive';
import { MatDialog } from '@angular/material/dialog';
import { AuthComponent } from '../../auth/auth.component';
import { UsersService } from '../../users.service';
import { UserService } from '../../user.service';

const names = ['vlad', 'sasha', 'ravil'];
const upperCase = names.map((name) => {
  return name.toLocaleUpperCase();
});

function aboutCompany(name: string) {
  return name;
}
const nameCompany = aboutCompany('О компании');
const newpages = [5, 4, 3, 2, 1];

const menuItems: string[] = [
  'Каталог',
  'Стройматериалы',
  'Инструменты',
  'Электрика',
  'Интерьер и одежда',
];
const upperCaseMenuItems: string[] = menuItems.map((item: string) => {
  return item.toUpperCase();
});

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, CommonModule, HoverHighlightDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly dialog = inject(MatDialog)
  private readonly UserService = inject(UserService)
  readonly headerItem1 = 'Главная';
  readonly headerItem3 = 'Каталог';
  readonly header2Item1 = 'Каталог';
  isShouCatalog: boolean = true;
  readonly aboutCompany = nameCompany;
  readonly newPages: number[] = newpages;
  menuItems: string[] = upperCaseMenuItems;
  isUpperCase: boolean = true;
  today: Date = new Date();
  changeTextMenu() {
    this.menuItems = upperCaseMenuItems.map((item) =>
      this.isUpperCase ? item.toLowerCase() : item.toUpperCase()
    );
    this.isUpperCase = !this.isUpperCase;
  }
openDialog(): void {
  const dialogRef = this.dialog.open(AuthComponent, {
    width: '400px',
    height: '200px'
    });

    dialogRef.afterClosed().subscribe((result: string)=> {
      console.log(result);
if (result === 'admin') {
this.UserService.loginAsAdmin()
} else if (result === 'user') {
  this.UserService.loginAsAdmin()
} else return undefined

    });
  }
public logOut() {
  if(confirm('Вы точно хотите выйти?')) {
    console.log('совершили logout');
    return this.UserService.logout();

  }
  else return false
}
}
