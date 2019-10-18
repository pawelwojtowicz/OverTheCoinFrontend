import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassesComponent } from './classes/classes.component';
import { UserListComponent } from './user-list/user-list.component';


const routes: Routes = [
  { path: '', component: ClassesComponent },
  { path: 'class', component: ClassesComponent },
  { path: 'user', component: UserListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
