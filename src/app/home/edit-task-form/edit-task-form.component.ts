import { TaskService } from './../task.service';
import { Task } from './../task.type';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-task-form',
  templateUrl: './edit-task-form.component.html',
  styleUrls: ['./edit-task-form.component.scss']
})
export class EditTaskFormComponent implements OnInit {

  @Output() closeFormEvent = new EventEmitter<Task>();

  taskTitle: FormControl;
  taskDescription: FormControl;
  taskDetails: FormControl[];
  newTaskDetail: FormControl;
  taskService: TaskService;
  taskId: number;

  constructor(taskService: TaskService) {
    this.newTaskDetail = new FormControl('');
    this.taskTitle = new FormControl('');
    this.taskDescription = new FormControl('');
    this.taskService = taskService;
    this.taskService.editForm$.subscribe( task => {
      this.taskId = task.id;
      this.taskTitle.setValue(task.taskTitle);
      this.taskDescription.setValue(task.taskDescription);
      this.taskDetails = task.taskDetails.map( taskDetail => new FormControl(taskDetail)) || [];
    });
  }

  ngOnInit(): void { }

  closeForm(){
    this.closeFormEvent.emit(null);
  }

  update(){
    this.closeFormEvent.emit(null);
    this.taskService.update({
      id: this.taskId,
      taskDescription: this.taskDescription.value,
      taskDetails: this.taskDetails.map(taskDetail => taskDetail.value),
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
