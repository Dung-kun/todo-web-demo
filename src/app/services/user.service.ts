import { Injectable } from '@angular/core';
import { map, Observable, of, shareReplay, Subject, takeUntil } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private check = new Subject();
  constructor() {}

  getUsers() {
      if (localStorage.getItem('user') != null) {
          return of(JSON.parse(localStorage.getItem('user') || '[]')).pipe(shareReplay(1));
      }
      return of([]);
  };


  getUserWithId(id : string) {
      if (localStorage.getItem('user') != null) {
          const users = JSON.parse(localStorage.getItem('user') || '[]');
          return of(users.filter((val : any) => val.id === id)[0]);
      }
      return of({})
  }
  changeUserData(users : any, val : any, idEdited : Number): Observable<User[]> {
    if(val && (val.user.name != '')){
      const temp = users.pipe(
        map((data : any) => {
          if (val?.key.includes('Add')) {
              if (data.length){
                  val.user.id = (Number(data[data.length - 1].id) + 1).toString();
              }else {
                  val.user.id = "0";
              }

              data = [
                  ...data,
                  val.user
              ];

          }
           else if (val?.key.includes('Edit')) {
              data[Number(idEdited)].name = val?.user.name;
              data[Number(idEdited)].position = val?.user.position;
          }
          return data;
      }))
      this.saveData(temp, 'user');
      return temp;
    }
    return users;
  }
  saveData(data : any, key : string) {
    const sub = data.pipe(takeUntil(this.check)).subscribe((val : any) => {
        localStorage[key] = JSON.stringify(val);
        this.check.next(1);
    })

  }

}
