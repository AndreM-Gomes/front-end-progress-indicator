import { UserService } from './../user.service';
import { HomeModule } from './home.module';
import { Injectable } from '@angular/core';
import { Task } from './task.type';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private taskSubject: BehaviorSubject<Task[]>;
  private editFormSubject: BehaviorSubject<Task>;

  public tasks$: Observable<Task[]>;
  public editForm$: Observable<Task>;

  tasks: Task[] = [
    {
      id: 1,
      progress: [10, 100],
      taskDescription: 'Estudar toda a stack Spring',
      taskDetails: ['MVC', 'Data'],
      taskTitle: 'Estudar Spring'
    },
    {
      id: 2,
      progress: [10, 100],
      taskDescription: 'Estudar DAO e transactions Hibernate',
      taskDetails: [],
      taskTitle: 'Estudar Hibernate'
    },
    {
      id: 3,
      progress: [10, 100],
      taskDescription: 'Estudar Angular como PWA e etc',
      taskDetails: ['Forms', 'Routing', 'RxJS'],
      taskTitle: 'Angular'
    }
  ];

  constructor(userService: UserService) {
    this.taskSubject = new BehaviorSubject<Task[]>(this.tasks);
    this.editFormSubject = new BehaviorSubject<Task>(null);
    this.tasks$ = this.taskSubject.asObservable();
    this.editForm$ = this.editFormSubject.asObservable();
  }

  createTask(newTask: Task){
    const tasks = this.taskSubject.getValue();
    this.taskSubject.next([...tasks, newTask]);
  }

  update(newTask: Task){
    const tasks = this.taskSubject.getValue();
    this.taskSubject.next([...tasks.filter(task => task.id !== newTask.id), newTask]);
  }

  deleteTask(id: number){
    const tasks = this.taskSubject.getValue();
    this.taskSubject.next(tasks.filter(task => task.id !== id));
  }

  editForm(task: Task){
    this.editFormSubject.next(task);
  }
}
