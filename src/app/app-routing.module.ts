import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './components/todo/todo.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path:"home",
    component: HomeComponent
  },
  // {
  //   path: "home/:id",
  //   component: TodoComponent
  // },
  {
    path:"**",
    component: HomeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
