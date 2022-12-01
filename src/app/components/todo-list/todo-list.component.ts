import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';
import { EditComponent } from '../form-dialog/edit.component';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { of } from 'rxjs';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  public tasks: Task[] = [];
  private idEdited: string = '';

  constructor(private dialog: MatDialog, private service: TaskService) {}
  ngOnInit(): void {
    this.service.getAllTasks().subscribe((value) => {
      this.tasks = value;
    });
  }

  openDialog(keyI: string, defaultValue?: Task) {
    const dialogRef = this.dialog.open(EditComponent, {
      data: {
        task: defaultValue || {},
        key: keyI,
        type: '',
      },
    });

    if (!defaultValue) {
      dialogRef
        .afterClosed()
        .pipe(
          switchMap((val) => {
            if(val == "none") {
              return of("none");
            }
            let taskTemp = new Task();

            taskTemp = {
              ...taskTemp,
              ...val,
              ...{ id: new Date().toISOString() },
            };
            return this.service.addTask(taskTemp);
          })
        )
        .subscribe((val) => {
          if(val !="none") {
            this.tasks.push(val as Task);
          }
        });

    } else {
      dialogRef
        .afterClosed()
        .pipe(
          switchMap((val) => {
            if(val == "none") {
              return of("none");
            }
            val.id = this.idEdited
            return this.service.updateTask(val);
          })
        )
        .subscribe((value) => {
          if(value != "none") {
            let index = this.tasks.findIndex((val) => val.id == this.idEdited);
            this.tasks.splice(index, 1, value as Task);
          }
        });
    }
  }

  deleteTask(id: string, index: number) {
      this.service.deleteTask(id);
      this.tasks.splice(index, 1);
  }

  // deleteUser(user: any)
  // {
  //   this.users = this.users.pipe(
  //     map(val => val.filter(data => data.id !== user.id))
  //   );
  //   this.service.saveData(this.users,'user');
  // }

  openDialogToEditUser(task: Task) {
    this.openDialog('Edit', task);
    this.idEdited = task.id;
  }

  openDialogToAddUser() {
    this.openDialog('Add');
  }
}
