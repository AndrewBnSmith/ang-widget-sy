import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.model';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor() {
    // Initialize with some tasks
    const initialTasks: Task[] = [
      { id: 1, title: 'Task 1', completed: false, date: '2023-10-01', type: 'personal' },
      { id: 2, title: 'Task 2', completed: false, date: '2023-10-02', type: 'friends' }
    ];
    this.tasksSubject.next(initialTasks);
  }

  addTask(task: Task): void {
    const tasks = this.tasksSubject.getValue();
    task.id = tasks.length + 1; // Simple ID generation
    this.tasksSubject.next([...tasks, task]);
  }

  updateTask(updatedTask: Task): void {
    const tasks = this.tasksSubject.getValue();
    const taskIndex = tasks.findIndex(task => task.id === updatedTask.id);
    if (taskIndex !== -1) {
      tasks[taskIndex] = updatedTask;
      this.tasksSubject.next([...tasks]);
    }
  }

  deleteTask(taskId: number): void {
    const tasks = this.tasksSubject.getValue();
    this.tasksSubject.next(tasks.filter(task => task.id !== taskId));
  }

  toggleTaskCompletion(taskId: number): void {
    const tasks = this.tasksSubject.getValue();
    const task = tasks.find(task => task.id === taskId);
    if (task) {
      task.completed = !task.completed;
      this.tasksSubject.next([...tasks]);
    }
  }
}