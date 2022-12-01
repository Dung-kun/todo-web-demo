import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  map,
  of,
  Subject,
  takeUntil,
  Observable,
  catchError,
  throwError,
} from 'rxjs';
import { Task } from '../models/task.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private check = new Subject();
  private url = 'http://localhost:3000/Task';

  constructor(public http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.log('An error occurred:', error.error);
    } else {
      console.log(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  addTask(task: Task): Observable<Task> {
    if (task.title == "" || task.author == "") {
      return of();
    }
    return this.http.post<Task>(this.url, task).pipe(
      catchError((err) => {
        this.handleError(err);
        return of(task);
      })
    );
  }

  updateTask(task: Task): Observable<Task> {
    if (!task) {
      return of();
    }
    return this.http.patch<Task>(this.url, task).pipe(
      catchError((err) => {
        this.handleError(err);
        return of(task);
      })
    );
  }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.url).pipe(
      catchError((err) => {
        this.handleError(err);
        return of([]);
      })
    );
  }

  deleteTask(id: string) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: {
        taskId: id
      },
    }
    this.http.delete<any>(this.url, options).pipe(
      tap((val) => {
        console.log('dung', val);
      }),
      catchError((err) => {
        this.handleError(err);
        return of([]);
      })
    ).subscribe();
  }

  getTasksWithId(id: string) {
    if (localStorage.getItem('task') != null) {
      const tasks = JSON.parse(localStorage.getItem('task') || '[]');
      return tasks.filter((item: any) => item.id === id);
    }
    return [];
  }

  changeTaskData(tasks: any, val: any, idEdited: Number, idUser: string) {
    if (val && val.task.name != '') {
      const temp = tasks.pipe(
        map((data: any) => {
          if (val?.key.includes('Add')) {
            val.task.id = idUser;
            data = [...data, val.task];
          } else if (val?.key.includes('Edit')) {
            data[Number(idEdited)].taskName = val?.task.taskName;
            data[Number(idEdited)].date = val?.task.date;
          }
          return data;
        })
      );
      this.saveData(temp, 'task');
      return temp;
    }
    return tasks;
  }

  saveData(data: any, key: string) {
    const sub = data.pipe(takeUntil(this.check)).subscribe((val: any) => {
      localStorage[key] = JSON.stringify(val);
      this.check.next(1);
    });
  }
}
