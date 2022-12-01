import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { pluck, switchMap, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  idUser: string = "";
  user$!: Observable<User>;

  constructor(private router: ActivatedRoute, private routerService: Router, private readonly service: UserService ) { }

  ngOnInit(): void {
    this.user$ = this.router.params.pipe(
      pluck('id'),
      tap((val)=> this.idUser = val),
      switchMap((val) => this.service.getUserWithId(val))
    )
  }


  returnHome() {
    this.routerService.navigate(['home']);
  }

}
