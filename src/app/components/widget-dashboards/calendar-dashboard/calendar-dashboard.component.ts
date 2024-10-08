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
  selector: 'app-calendar-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar-dashboard.component.html',
  styleUrls: ['./calendar-dashboard.component.scss']
})
export class CalendarDashboardComponent {
  tasks: Task[] = [];
  currentMonth: Date = new Date();
  daysInMonth: number[] = [];

  constructor(private taskService: TaskService) {
    this.taskService.tasks$.subscribe((tasks: Task[]) => this.tasks = tasks);
    this.generateCalendar();
  }

  generateCalendar() {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    this.daysInMonth = Array.from({ length: lastDay.getDate() }, (_, i) => i + 1);
  }

  getTasksForDate(date: number): Task[] {
    const dateString = `${this.currentMonth.getFullYear()}-${String(this.currentMonth.getMonth() + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    return this.tasks.filter(task => task.date === dateString);
  }

  previousMonth(): void {
    this.currentMonth = new Date(this.currentMonth.setMonth(this.currentMonth.getMonth() - 1));
    this.generateCalendar();
  }

  nextMonth(): void {
    this.currentMonth = new Date(this.currentMonth.setMonth(this.currentMonth.getMonth() + 1));
    this.generateCalendar();
  }

  previousYear(): void {
    this.currentMonth = new Date(this.currentMonth.setFullYear(this.currentMonth.getFullYear() - 1));
    this.generateCalendar();
  }

  nextYear(): void {
    this.currentMonth = new Date(this.currentMonth.setFullYear(this.currentMonth.getFullYear() + 1));
    this.generateCalendar();
  }
}