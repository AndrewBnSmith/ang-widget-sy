import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../../models/task.model';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-my-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.scss']
})
export class MyTasksComponent implements OnInit {
  tasks: Task[] = [];
  selectedTask: Task | null = null;
  isEditing: boolean = false;
  newTask: Task = { id: 0, title: '', completed: false, date: '', type: 'personal' };
  view: 'my' | 'friends' | 'all' | 'completed' = 'my';

  constructor(private taskService: TaskService) {
    this.taskService.tasks$.subscribe((tasks: Task[]) => this.tasks = tasks);
  }

  ngOnInit(): void {
    this.newTask.date = new Date().toISOString().split('T')[0];
  }

  get filteredTasks(): Task[] {
    switch (this.view) {
      case 'my':
        return this.tasks.filter(task => task.type === 'personal' && !task.completed);
      case 'friends':
        return this.tasks.filter(task => task.type === 'friends' && !task.completed);
      case 'all':
        return this.tasks.filter(task => !task.completed);
      case 'completed':
        return this.tasks.filter(task => task.completed);
      default:
        return this.tasks;
    }
  }

  get taskCounts(): { [key: string]: number } {
    return this.tasks.reduce((counts, task) => {
      if (task.completed) {
        counts['completed'] = (counts['completed'] || 0) + 1;
      } else {
        counts[task.type] = (counts[task.type] || 0) + 1;
      }
      return counts;
    }, {} as { [key: string]: number });
  }

  onTaskClick(task: Task): void {
    this.selectedTask = task;
  }

  backToTasks(): void {
    this.selectedTask = null;
  }

  toggleTaskCompletion(task: Task): void {
    this.taskService.toggleTaskCompletion(task.id);
    setTimeout(() => {
      task.completed = true;
    }, 2000);
  }

  undoTaskCompletion(task: Task): void {
    this.taskService.toggleTaskCompletion(task.id);
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task.id);
  }

  addTask(): void {
    this.taskService.addTask(this.newTask);
    this.newTask = { id: 0, title: '', completed: false, date: new Date().toISOString().split('T')[0], type: 'personal' };
  }

  editTask(task: Task): void {
    this.isEditing = true;
    this.selectedTask = { ...task };
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

  setView(view: 'my' | 'friends' | 'all' | 'completed'): void {
    this.view = view;
  }
}