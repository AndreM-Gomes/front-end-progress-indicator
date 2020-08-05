import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Task} from '../home/task.type';
import {FormEvent, FormEventType} from '../home/form-event.type';

@Injectable({
  providedIn: 'root'
})
export class TaskFormService {

  private formSubject = new BehaviorSubject<FormEvent>({type: FormEventType.CLOSE_EDIT_FORM});
  public form$ = this.formSubject.asObservable();

  constructor() {
  }

  openNewTask() {
    this.formSubject.next({type: FormEventType.OPEN_NEW_FORM});
  }

  closeNewTask() {
    this.formSubject.next({type: FormEventType.CLOSE_NEW_FORM});
  }

  openEditTask(taskToEdit: Task) {
    this.formSubject.next({
      type: FormEventType.OPEN_EDIT_FORM,
      payload: taskToEdit
    });
  }

  closeEditTask() {
    this.formSubject.next({type: FormEventType.CLOSE_EDIT_FORM});
  }
}
