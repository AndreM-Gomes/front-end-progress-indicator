import { TaskCardComponent } from './main-task-list/task-card/task-card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MainTaskListComponent } from './main-task-list/main-task-list.component';


@NgModule({
  declarations: [HomeComponent, MainTaskListComponent, TaskCardComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
