import { map } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { TaskService } from './../task.service';
import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Task } from '../task.type';
import { Subtask } from '../subtask.type';

@Component({
  selector: 'app-main-task-list',
  templateUrl: './main-task-list.component.html',
  styleUrls: ['./main-task-list.component.scss']
})
export class MainTaskListComponent implements OnInit {
  private taskService: TaskService;
  @Input() tasks$: Observable<Task[]>;
  @Output() openEditFormEvent: EventEmitter<Task>;

  constructor(taskService: TaskService) {
    this.taskService = taskService;
    this.tasks$ = this.taskService.tasks$;
    this.openEditFormEvent = new EventEmitter<Task>();
  }
  ngOnInit(): void {
    this.openEditFormEvent = new EventEmitter<Task>();
  }

  deleteTask(id: number){
    this.taskService.deleteTask(id);
  }

  openEditForm(task: Task){
    this.openEditFormEvent.emit(task);
  }

  editTask(task: Task){
    this.taskService.editForm(task);
  }

  checkSubtask(newTask: Task){
    this.taskService.update(newTask);
  }
}
