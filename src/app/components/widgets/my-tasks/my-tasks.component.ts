import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-my-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.scss']
})
export class MyTasksComponent {
  tasks: Task[] = [
    { id: 1, title: 'Task 1', completed: false },
    { id: 2, title: 'Task 2', completed: true },
    { id: 3, title: 'Task 3', completed: false },
  ];

  newTaskTitle: string = '';

  toggleTaskCompletion(task: Task): void {
    task.completed = !task.completed;
  }

  addTask(): void {
    if (this.newTaskTitle.trim()) {
      const newTask: Task = {
        id: this.tasks.length + 1,
        title: this.newTaskTitle,
        completed: false
      };
      this.tasks.push(newTask);
      this.newTaskTitle = '';
    }
  }

  deleteTask(task: Task): void {
    this.tasks = this.tasks.filter(t => t.id !== task.id);
  }
}