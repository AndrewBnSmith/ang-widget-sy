export interface Task {
    id: number;
    title: string;
    completed: boolean;
    date: string;
    type: 'personal' | 'friends';
  }