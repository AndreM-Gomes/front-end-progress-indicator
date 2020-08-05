import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from '../../task.type';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {
  @Input() task: Task;
  @Output() deleteTaskEvent: EventEmitter<number>;
  @Output() editTaskEvent: EventEmitter<Task>;
  @Output() checkSubtaskEvent: EventEmitter<Task>;

  constructor() {
    this.deleteTaskEvent = new EventEmitter<number>();
    this.editTaskEvent = new EventEmitter<Task>();
    this.checkSubtaskEvent = new EventEmitter<Task>();
  }

  ngOnInit(): void {
  }

  deleteTask(id: number) {
    this.deleteTaskEvent.emit(id);
  }

  openForm(task: Task) {
    this.editTaskEvent.emit(task);
  }

  completedTasks(): number {
    return this.task.taskDetails.filter(
      subtask => subtask.completed === true
    ).length;
  }

  checkSubtask(event, subtaskId: number, task: Task) {
    const targetSubtask = this.task.taskDetails.find(subtask => subtask.id === subtaskId);
    const newSubtask = {
      id: subtaskId,
      completed: event.target.checked,
      name: targetSubtask.name
    };
    const otherTasks = this.task.taskDetails.filter(subtask => subtask.id !== subtaskId);
    this.checkSubtaskEvent.emit({
      completed: task.completed,
      id: task.id,
      taskDescription: task.taskDescription,
      taskDetails: [newSubtask, ...otherTasks],
      taskTitle: task.taskTitle
    });
  }
}
