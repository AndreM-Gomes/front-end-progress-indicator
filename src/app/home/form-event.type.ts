import {Task} from './task.type';

export interface FormEvent {
  type: FormEventType;
  payload?: Task;
}

export enum FormEventType {
  OPEN_EDIT_FORM,
  CLOSE_EDIT_FORM,
  OPEN_NEW_FORM,
  CLOSE_NEW_FORM
}
