import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  date: string; // Add date property to tasks
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([
    { id: 1, title: 'Task 1', completed: false, date: '2023-10-01' },
    { id: 2, title: 'Task 2', completed: true, date: '2023-10-02' },
    { id: 3, title: 'Task 3', completed: false, date: '2023-10-03' },
  ]);

  tasks$ = this.tasksSubject.asObservable();

  getTasks(): Task[] {
    return this.tasksSubject.value;
  }

  addTask(task: Task): void {
    const tasks = this.tasksSubject.value;
    this.tasksSubject.next([...tasks, task]);
  }

  deleteTask(taskId: number): void {
    const tasks = this.tasksSubject.value.filter(task => task.id !== taskId);
    this.tasksSubject.next(tasks);
  }

  toggleTaskCompletion(taskId: number): void {
    const tasks = this.tasksSubject.value.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    this.tasksSubject.next(tasks);
  }
}