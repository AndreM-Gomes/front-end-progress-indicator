import {UserService} from '../services/user.service';
import {Injectable} from '@angular/core';
import {Task} from '../home/task.type';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  public tasks$: Observable<Task[]>;
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
  private taskSubject: BehaviorSubject<Task[]>;

  constructor(userService: UserService) {
    this.taskSubject = new BehaviorSubject<Task[]>(this.tasks);
    this.tasks$ = this.taskSubject.asObservable();
  }

  createTask(newTask: Task) {
    const tasks = this.taskSubject.getValue();
    this.taskSubject.next([...tasks, newTask]);
  }

  update(newTask: Task) {
    const tasks = this.taskSubject.getValue();
    this.taskSubject.next([...tasks.filter(task => task.id !== newTask.id), newTask].sort((a, b) => {
      const completedTaskA = a.taskDetails.filter(subtask => subtask.completed === true);
      const completedTaskB = b.taskDetails.filter(subtask => subtask.completed === true);
      return completedTaskA.length - completedTaskB.length;
    }));
  }

  deleteTask(id: number) {
    const tasks = this.taskSubject.getValue();
    this.taskSubject.next(tasks.filter(task => task.id !== id));
  }
}
