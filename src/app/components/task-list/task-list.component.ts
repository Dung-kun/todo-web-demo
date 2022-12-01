import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { map, switchMap } from 'rxjs/operators'
import { EditComponent } from '../form-dialog/edit.component';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {

  @Input() idUser!: string;
  idTask: Number = 0;
  task: Task = new Task();




  constructor(private readonly service: TaskService, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.task = this.service.getTasksWithId(this.idUser);
  }
}
