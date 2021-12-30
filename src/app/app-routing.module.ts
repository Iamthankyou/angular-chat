import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ConvoListComponent} from './convo-list/convo-list.component';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from "./app.component";

const routes: Routes = [
  {
    path: '/',
    component: ConvoListComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
