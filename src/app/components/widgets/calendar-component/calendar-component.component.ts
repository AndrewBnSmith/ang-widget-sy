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
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar-component.component.html', // Ensure this path is correct
  styleUrls: ['./calendar-component.component.scss'] // Ensure this path is correct
})
export class CalendarComponent {
  tasks: Task[] = [];
  currentMonth: Date = new Date();
  daysInMonth: number[] = [];
  selectedTasks: Task[] = [];
  selectedDay: number | null = null; // Add property to track the selected day
  today: number = new Date().getDate(); // Add property to track today's date
  currentMonthNumber: number = new Date().getMonth(); // Add property to track the current month
  currentYear: number = new Date().getFullYear(); // Add property to track the current year

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

  onDayClick(date: number): void {
    this.selectedDay = date; // Set the selected day
    this.selectedTasks = this.getTasksForDate(date);
  }

  backToCalendar(): void {
    this.selectedDay = null; // Reset the selected day to go back to the calendar view
  }

  isToday(day: number): boolean {
    return day === this.today && this.currentMonth.getMonth() === this.currentMonthNumber && this.currentMonth.getFullYear() === this.currentYear;
  }
}