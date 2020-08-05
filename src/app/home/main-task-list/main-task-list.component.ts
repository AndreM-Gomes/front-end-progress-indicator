import {TaskFormService} from './../../services/task-form.service';
import {Observable} from 'rxjs';
import {TaskService} from '../../services/task.service';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from '../task.type';

@Component({
  selector: 'app-main-task-list',
  templateUrl: './main-task-list.component.html',
  styleUrls: ['./main-task-list.component.scss']
})
export class MainTaskListComponent implements OnInit {
  @Input() tasks$: Observable<Task[]>;
  @Output() openEditFormEvent: EventEmitter<Task>;

  constructor(
    private taskService: TaskService,
    private taskFormService: TaskFormService
  ) {
    this.tasks$ = this.taskService.tasks$;
    this.openEditFormEvent = new EventEmitter<Task>();
  }

  ngOnInit(): void {
    this.openEditFormEvent = new EventEmitter<Task>();
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id);
  }

  openEditForm(task: Task) {
    this.openEditFormEvent.emit(task);
  }

  editTask(task: Task) {
    this.taskFormService.openEditTask(task);
  }

  checkSubtask(newTask: Task) {
    this.taskService.update(newTask);
  }
}
