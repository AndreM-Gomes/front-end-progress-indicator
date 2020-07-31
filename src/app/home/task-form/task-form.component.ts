import { Subtask } from './../subtask.type';
import { TaskService } from './../task.service';
import { Task } from './../task.type';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {

  @Output() closeFormEvent = new EventEmitter<Task>();
  @Output() emitDataEvent = new EventEmitter<Task>();

  taskTitle: FormControl;
  taskDescription: FormControl;
  taskDetails: FormControl[];
  newTaskDetail: FormControl;
  taskId: number;

  constructor(private taskService: TaskService) {
    this.newTaskDetail = new FormControl('');
    this.taskTitle = new FormControl('');
    this.taskDescription = new FormControl('');
    this.taskService.contentForm$.subscribe( task => {
      this.taskId = task.id;
      this.taskTitle.setValue(task.taskTitle);
      this.taskDescription.setValue(task.taskDescription);
      this.taskDetails = task.taskDetails.map( taskDetail => new FormControl(taskDetail.name)) || [];
    });
  }

  ngOnInit(): void { }

  closeForm(){
    this.closeFormEvent.emit(null);
  }

  emitData(){
    this.closeFormEvent.emit(null);
    this.emitDataEvent.emit({
      id: this.taskId,
      taskDescription: this.taskDescription.value,
      taskDetails: this.taskDetails.map(taskDetail => { return {completed: false,id:0,name: taskDetail.value}}),
      taskTitle: this.taskTitle.value,
      completed: false
    });
  }

  addNewTaskDetail(){
    if (this.newTaskDetail.value.length > 0){
      this.taskDetails.push(new FormControl(this.newTaskDetail.value));
      this.newTaskDetail.setValue('');
    }
  }
  addNewTaskOnEnter(event: KeyboardEvent){
    if (event.key === 'Enter'){
      this.addNewTaskDetail();
    }
  }
}
