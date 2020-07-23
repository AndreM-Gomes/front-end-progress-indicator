import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../task.type';

@Component({
  selector: 'app-main-task-list',
  templateUrl: './main-task-list.component.html',
  styleUrls: ['./main-task-list.component.scss']
})
export class MainTaskListComponent implements OnInit {
  @Input() tasks: Task[] = [
    {
      progress: [10, 100],
      taskDescription: 'Read Clean Code and resume main ideas from that',
      taskDetails: ['Read a Book', 'Make a resume'],
      taskTitle: 'Read Clean Code'
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
