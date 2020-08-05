import {FormEventType} from './../form-event.type';
import {TaskFormService} from './../../services/task-form.service';
import {Subscription} from 'rxjs';
import {Subtask} from './../subtask.type';
import {TaskService} from '../../services/task.service';
import {Task} from './../task.type';
import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit, OnDestroy {

  @Output() closeFormEvent = new EventEmitter<Task>();
  @Output() emitDataEvent = new EventEmitter<Task>();

  taskTitle = '';
  taskDescription = '';
  subtasks: Subtask[] = [];
  newTaskDetail = '';
  taskId: number;
  tempTask: Task;
  taskFormSubscription: Subscription;
  taskServiceSubscription: Subscription;
  private actualState: FormEventType;

  constructor(
    private taskService: TaskService,
    private taskFormService: TaskFormService
  ) {

    this.taskFormSubscription = this.taskFormService.form$.subscribe(
      taskFormEvent => {
        switch (taskFormEvent.type) {
          case FormEventType.OPEN_EDIT_FORM:
            this.actualState = taskFormEvent.type;
            this.taskTitle = taskFormEvent.payload.taskTitle;
            this.taskDescription = taskFormEvent.payload.taskDescription;
            this.subtasks = taskFormEvent.payload.taskDetails;
            this.taskId = taskFormEvent.payload.id;
            break;
          case FormEventType.OPEN_NEW_FORM:
            this.actualState = taskFormEvent.type;
            break;
          default:
            break;
        }
      }
    );
  }

  ngOnInit(): void {

  }

  emitData() {
    this.emitDataEvent.emit({
      completed: false,
      id: this.taskId,
      taskDescription: this.taskDescription,
      taskDetails: this.subtasks.filter(subtask => subtask.name.length > 0),
      taskTitle: this.taskTitle
    });
    this.closeForm();
  }

  closeForm() {
    switch (this.actualState) {
      case FormEventType.OPEN_EDIT_FORM:
        this.taskFormService.closeEditTask();
        break;
      case FormEventType.OPEN_NEW_FORM:
        this.taskFormService.closeNewTask();
        break;
      default:
        break;
    }
  }

  addNewTaskDetail() {
    if (this.newTaskDetail.length > 0) {
      this.subtasks.push({
        id: this.subtasks.length + 1,
        completed: false,
        name: this.newTaskDetail
      });
      this.newTaskDetail = '';
    }
  }

  deleteSubtask(id: number) {
    this.subtasks = this.subtasks.filter(task => task.id !== id);
  }

  addNewTaskOnEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.addNewTaskDetail();
    }
  }

  ngOnDestroy() {
    this.taskFormSubscription.unsubscribe();
  }
}
