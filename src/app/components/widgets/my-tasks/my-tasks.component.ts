import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
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
  imports: [CommonModule, FormsModule], // Add FormsModule to imports
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.scss']
})
export class MyTasksComponent implements OnInit {
  tasks: Task[] = [];
  selectedTask: Task | null = null; // Add property to track the selected task
  isEditing: boolean = false; // Add property to track if a task is being edited
  newTask: Task = { id: 0, title: '', completed: false, date: '' }; // Add property for new task

  constructor(private taskService: TaskService) {
    this.taskService.tasks$.subscribe((tasks: Task[]) => this.tasks = tasks);
  }

  ngOnInit(): void {
    this.newTask.date = new Date().toISOString().split('T')[0]; // Set default date to today's date
  }

  onTaskClick(task: Task): void {
    this.selectedTask = task; // Set the selected task
  }

  backToTasks(): void {
    this.selectedTask = null; // Reset the selected task to go back to the tasks view
  }

  toggleTaskCompletion(task: Task): void {
    this.taskService.toggleTaskCompletion(task.id);
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task.id);
  }

  addTask(): void {
    this.taskService.addTask(this.newTask);
    this.newTask = { id: 0, title: '', completed: false, date: new Date().toISOString().split('T')[0] }; // Reset new task with default date
  }

  editTask(task: Task): void {
    this.isEditing = true;
    this.selectedTask = { ...task }; // Clone the task to edit
  }

  saveTask(): void {
    if (this.selectedTask) {
      this.taskService.updateTask(this.selectedTask);
      this.isEditing = false;
      this.selectedTask = null;
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.selectedTask = null;
  }
}