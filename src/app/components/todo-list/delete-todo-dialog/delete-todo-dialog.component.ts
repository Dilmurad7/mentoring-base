import { Component, inject } from "@angular/core";
import { MatIcon } from "@angular/material/icon";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogClose,
  MatDialogModule,
} from '@angular/material/dialog';
import { Todo } from "../../../Interfaces/todo.interface";

@Component
 ({
  selector: 'app-delete-todo-dialog',
  standalone: true,
  imports: [MatDialogModule, MatDialogClose, MatIcon,],
  templateUrl: './delete-todo-dialog.component.html',
  styleUrl: './delete-todo-dialog.component.scss',

 })

 export class DeleteTodoDialogComponent {
  public readonly data = inject<{todo: Todo}>(MAT_DIALOG_DATA);
  readonly dialog = inject(MatDialog);
  constructor() {
    console.log('Данные которые пришли в модалку', this.data);
  }

 }
