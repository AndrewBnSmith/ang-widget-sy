import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor() {}

  toggleTaskCompletion(taskId: number): void {
    const tasks = this.tasksSubject.getValue();
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
      tasks[taskIndex].completed = !tasks[taskIndex].completed;
      this.tasksSubject.next(tasks);
    }
  }

  deleteTask(taskId: number): void {
    const tasks = this.tasksSubject.getValue();
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    this.tasksSubject.next(updatedTasks);
  }

  addTask(task: Task): void {
    const tasks = this.tasksSubject.getValue();
    task.id = tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1; // Generate a new ID
    tasks.push(task);
    this.tasksSubject.next(tasks);
  }

  updateTask(updatedTask: Task): void {
    const tasks = this.tasksSubject.getValue();
    const taskIndex = tasks.findIndex(task => task.id === updatedTask.id);
    if (taskIndex !== -1) {
      tasks[taskIndex] = updatedTask;
      this.tasksSubject.next(tasks);
    }
  }
}