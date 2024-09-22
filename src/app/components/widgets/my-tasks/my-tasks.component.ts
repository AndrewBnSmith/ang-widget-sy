import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../../services/task.service';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  date: string;
}

@Component({
  selector: 'app-my-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.scss']
})
export class MyTasksComponent {
  tasks: Task[] = [];
  newTaskTitle: string = '';
  newTaskDate: string = '';

  constructor(private taskService: TaskService) {
    this.taskService.tasks$.subscribe(tasks => this.tasks = tasks);
  }

  toggleTaskCompletion(task: Task): void {
    this.taskService.toggleTaskCompletion(task.id);
  }

  addTask(): void {
    if (this.newTaskTitle.trim() && this.newTaskDate.trim()) {
      const newTask: Task = {
        id: this.tasks.length + 1,
        title: this.newTaskTitle,
        completed: false,
        date: this.newTaskDate
      };
      this.taskService.addTask(newTask);
      this.newTaskTitle = '';
      this.newTaskDate = '';
    }
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task.id);
  }
}