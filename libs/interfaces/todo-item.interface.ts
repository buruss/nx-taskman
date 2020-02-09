import { ITodoLabel } from './todo-label.interface';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface ITodoItem {
    id: string;
    userId: number;
    title: string;
    notes?: string;
    startDate?: Date;
    dueDate?: Date;
    completed?: boolean;
    starred?: boolean;
    important?: boolean;
    selected?: boolean;
    deleted?: boolean;
    labels?: ITodoLabel[];
  }
  