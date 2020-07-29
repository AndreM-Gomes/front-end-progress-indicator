import { Subscription } from 'rxjs';
import { TaskService } from './task.service';
import { UserService } from './../user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Task } from './task.type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  taskSubscription: Subscription;
  userSubscription: Subscription;
  showEditForm: boolean;
  taskToEdit: Task;

  constructor(
    private userService: UserService,
    private taskService: TaskService
    ) { }

  ngOnInit(): void {
    this.userSubscription = this.userService.user$.subscribe( user => {
      console.log(user.getIdToken());
    });
    this.taskSubscription = this.taskService.editForm$.subscribe( task => {
      this.openEditForm();
      this.taskToEdit = task;
      console.log(this.taskToEdit)
    });

    this.showEditForm = true;
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.taskSubscription.unsubscribe();
  }

  openEditForm(){
    this.showEditForm = true;
  }

  closeEditForm(){
    this.showEditForm = false;
  }
}
