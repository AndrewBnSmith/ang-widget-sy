import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../services/task.service';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  date: string;
}

@Component({
  selector: 'app-task-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.scss']
})
export class TaskDashboardComponent {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {
    this.taskService.tasks$.subscribe((tasks: Task[]) => this.tasks = tasks);
  }

  toggleTaskCompletion(task: Task): void {
    this.taskService.toggleTaskCompletion(task.id);
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task.id);
  }
}