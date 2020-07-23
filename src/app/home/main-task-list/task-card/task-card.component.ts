import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {
  @Input() taskTitle: string;
  @Input() progress: [number, number];
  @Input() taskDescription: string;
  @Input() taskDetails: string[];

  constructor() { }

  ngOnInit(): void {
  }

}
