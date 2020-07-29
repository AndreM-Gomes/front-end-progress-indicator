import { ReactiveFormsModule } from '@angular/forms';
import { TaskCardComponent } from './main-task-list/task-card/task-card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MainTaskListComponent } from './main-task-list/main-task-list.component';
import { EditTaskFormComponent } from './edit-task-form/edit-task-form.component';


@NgModule({
  declarations: [HomeComponent, MainTaskListComponent, TaskCardComponent, EditTaskFormComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
