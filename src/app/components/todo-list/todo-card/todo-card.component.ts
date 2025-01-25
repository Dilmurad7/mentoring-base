import { MatCardModule } from '@angular/material/card';
import { Todo } from './../../../Interfaces/todo.interface';
import { NgFor } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { TodoListComponent } from '../todo-list.component';
import { LimitTitlePipe } from '../../../pipes/limitTitle.pipe';
import { DeleteTodoDialogComponent } from '../delete-todo-dialog/delete-todo-dialog.component';
import {
  MatDialog,
} from '@angular/material/dialog';
import { EditTodoDialogComponent } from '../edit-todo-dialog/edit-todo-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss',
  standalone: true,
  imports: [LimitTitlePipe, MatCardModule,MatButtonModule, MatCardModule, MatSnackBarModule,  MatTooltipModule],
})
export class TodoCardComponent {
@Input()
public todo!: Todo;
@Output()
public deleteTodo = new EventEmitter<number>();
@Output()
public editTodo = new EventEmitter;
readonly dialog = inject(MatDialog);
private snackBar = inject(MatSnackBar)
public OpenDeleteDialog(): void {
  const dialogRef = this.dialog.open(DeleteTodoDialogComponent, {
    width: '700px',
    data : {todo : this.todo},
  })
  dialogRef.afterClosed().subscribe((result) => {
    console.log('dialog was closed');
    if(result) {
      this.deleteTodo.emit(this.todo.id);
      this.snackBar.open('Задача удалена', '', {
        duration: 3000
      })
    } else
    this.snackBar.open("Отмена удаления", '', {
      duration: 3000
    });
  })
}

  public onDeleteTodo(): void {
    const dialogRef = this.dialog.open(EditTodoDialogComponent, {
      data: { todo: this.todo },
    });

    dialogRef.afterClosed().subscribe((editResult) => {
      console.log('Модалка закрылась', 'значение формы: ', editResult);
      if (editResult) {
        this.editTodo.emit(this.todo.id);
        this.snackBar.open('Задача редактирована', '', {
          duration: 3000
        })
      } else
      this.snackBar.open('Отмена редактирования', '', {
        duration: 3000
      })
      this.editTodo.emit(editResult);
    });
  }

  }
