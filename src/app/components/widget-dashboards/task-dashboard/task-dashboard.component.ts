import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../../services/task.service';
import { MiniCalendarComponent } from '../../mini-calendar/mini-calendar.component';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  date: string;
  type: 'personal' | 'friends';
}

@Component({
  selector: 'app-task-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, MiniCalendarComponent],
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.scss']
})
export class TaskDashboardComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  searchQuery: string = '';
  filter: 'all' | 'completed' | 'pending' | 'personal' | 'friends' = 'all'; // Include 'personal' and 'friends'
  sortOrder: 'date' | 'title' = 'date';
  newTask: Task = { id: 0, title: '', completed: false, date: '', type: 'personal' };

  constructor(private taskService: TaskService) {
    this.taskService.tasks$.subscribe((tasks: Task[]) => {
      this.tasks = tasks;
      this.filterTasks();
    });
  }

  ngOnInit(): void {
    this.filterTasks();
  }

  filterTasks(): void {
    this.filteredTasks = this.tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesFilter = this.filter === 'all' ||
        (this.filter === 'completed' && task.completed) ||
        (this.filter === 'pending' && !task.completed) ||
        (this.filter === 'personal' && task.type === 'personal') ||
        (this.filter === 'friends' && task.type === 'friends');
      return matchesSearch && matchesFilter;
    });
    this.sortTasks();
  }

  sortTasks(): void {
    this.filteredTasks.sort((a, b) => {
      if (this.sortOrder === 'date') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else {
        return a.title.localeCompare(b.title);
      }
    });
  }

  setFilter(filter: 'all' | 'completed' | 'pending' | 'personal' | 'friends'): void { // Include 'personal' and 'friends'
    this.filter = filter;
    this.filterTasks();
  }

  toggleTaskCompletion(task: Task): void {
    this.taskService.toggleTaskCompletion(task.id);
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task.id);
  }

  addTask(): void {
    if (this.newTask.title && this.newTask.date) {
      this.taskService.addTask(this.newTask);
      this.newTask = { id: 0, title: '', completed: false, date: '', type: 'personal' };
    }
  }

  onDateSelect(date: string): void {
    this.searchQuery = date;
    this.filterTasks();
  }
}