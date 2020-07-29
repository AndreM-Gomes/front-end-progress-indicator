import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../task.type';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {
  @Input() task: Task;
  @Output() deleteTaskEvent: EventEmitter<number>;
  @Output() editTaskEvent: EventEmitter<Task>;

  constructor() {
    this.deleteTaskEvent = new EventEmitter<number>();
    this.editTaskEvent = new EventEmitter<Task>();
  }

  ngOnInit(): void {
  }

  deleteTask(id: number){
    this.deleteTaskEvent.emit(id);
  }

  openForm(task: Task){
    this.editTaskEvent.emit(task);
  }
}
