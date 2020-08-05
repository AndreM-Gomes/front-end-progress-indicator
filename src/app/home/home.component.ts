import {FormEventType} from './form-event.type';
import {TaskFormService} from './../services/task-form.service';
import {Subscription} from 'rxjs';
import {TaskService} from './../services/task.service';
import {UserService} from './../services/user.service';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Task} from './task.type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  taskSubscription: Subscription;
  userSubscription: Subscription;
  taskFormSubscription: Subscription;

  showEditForm = false;
  showNewTaskForm = false;
  taskToEdit: Task;

  constructor(
    private userService: UserService,
    private taskService: TaskService,
    private taskFormService: TaskFormService
  ) {
  }

  ngOnInit(): void {
    this.userSubscription = this.userService.user$.subscribe(user => {
      console.log(user.getIdToken());
    });

    this.taskFormSubscription = this.taskFormService.form$.subscribe(
      taskFormEvent => {
        switch (taskFormEvent.type) {
          case FormEventType.OPEN_EDIT_FORM:
            this.showEditForm = true;
            this.taskToEdit = taskFormEvent.payload;
            break;
          case FormEventType.CLOSE_EDIT_FORM:
            this.showEditForm = false;
            break;
          case FormEventType.OPEN_NEW_FORM:
            this.showNewTaskForm = true;
            break;
          case FormEventType.CLOSE_NEW_FORM:
            this.showNewTaskForm = false;
            break;
          default:
            break;
        }
      }
    );
    this.showEditForm = false;
  }

  closeEditForm() {
    this.taskFormService.closeEditTask();
  }

  closeNewTaskForm(){
    this.taskFormService.closeNewTask();
  }

  updateTask(task: Task) {
    this.taskService.update(task);
  }

  newTask(task: Task) {
    this.taskService.createTask(task);
  }

  openNewTaskForm() {
    this.taskFormService.openNewTask();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.taskSubscription.unsubscribe();
    this.taskFormSubscription.unsubscribe();
  }
}
