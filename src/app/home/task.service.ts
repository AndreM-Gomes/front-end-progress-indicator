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
      taskDescription: 'Estudar toda a stack Spring',
      taskDetails: [
        {
          id: 1,
          name: 'MVC',
          completed: true
        },
        {
          id: 2,
          name: 'Security',
          completed: false
        }
      ],
      taskTitle: 'Estudar Spring',
      completed: false
    },
    {
      id: 2,
      taskDescription: 'Estudar DAO e transactions Hibernate',
      taskDetails: [],
      taskTitle: 'Estudar Hibernate',
      completed: false
    },
    {
      id: 3,
      taskDescription: 'Estudar Angular como PWA e etc',
      taskDetails: [
        {
          id: 1,
          name: 'Routing',
          completed: false
        }
      ],
      taskTitle: 'Angular',
      completed: false
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
    this.taskSubject.next([...tasks.filter(task => task.id !== newTask.id), newTask].sort((a, b) => {
      const completedTaskA = a.taskDetails.filter( subtask => subtask.completed === true);
      const completedTaskB = b.taskDetails.filter( subtask => subtask.completed === true);
      return completedTaskA.length - completedTaskB.length;
    }));
  }

  deleteTask(id: number){
    const tasks = this.taskSubject.getValue();
    this.taskSubject.next(tasks.filter(task => task.id !== id));
  }

  editForm(task: Task){
    this.editFormSubject.next(task);
  }
}
