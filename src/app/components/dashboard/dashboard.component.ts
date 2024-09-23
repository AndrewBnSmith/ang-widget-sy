import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FriendsListComponent } from '../friends-list/friends-list.component';
import { WidgetComponent } from '../widget/widget.component';
import { TaskDashboardComponent } from '../widget-dashboards/task-dashboard/task-dashboard.component';
import { CalendarDashboardComponent } from '../widget-dashboards/calendar-dashboard/calendar-dashboard.component';
import { MyTasksComponent } from '../widgets/my-tasks/my-tasks.component';
import { CalendarComponent } from '../widgets/calendar-component/calendar-component.component';
import { MyBudgetComponent } from '../my-budget/my-budget.component';


interface Widget {
  id: number;
  size: 'small' | 'medium' | 'large';
  name: string;
  description: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    FriendsListComponent,
    WidgetComponent,
    MyTasksComponent,
    CalendarComponent,
    TaskDashboardComponent,
    CalendarDashboardComponent,
    MyBudgetComponent // Add MyBudgetComponent to imports
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  widgets: Widget[] = [
    { id: 1, size: 'medium', name: 'My Tasks', description: 'This is the tasks widget' },
    { id: 2, size: 'medium', name: 'Calendar', description: 'This is the calendar widget' },
    { id: 3, size: 'medium', name: 'Widget 1', description: 'This is widget 1' },
    { id: 4, size: 'medium', name: 'Widget 2', description: 'This is widget 2' },
    { id: 5, size: 'medium', name: 'Widget 3', description: 'This is widget 3' },
    { id: 6, size: 'medium', name: 'My Budget', description: 'This is the budget widget' } // Add budget widget
  ];

  placeholderIndex: number | null = null;
  draggedIndex: number | null = null;
  detailedView: string | null = null; // Add property to track detailed view

  sidebarCollapsed = false; // State for sidebar collapse
  friendsListCollapsed = false; // State for friends list collapse

  onDragStart(event: DragEvent, index: number) {
    this.draggedIndex = index;
    event.dataTransfer?.setData('text/plain', index.toString());
  }

  onDragOver(event: DragEvent, index: number) {
    event.preventDefault();
    this.placeholderIndex = index;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.placeholderIndex = null;
  }

  onDrop(event: DragEvent, index: number) {
    event.preventDefault();
    if (this.draggedIndex !== null) {
      const draggedWidget = this.widgets[this.draggedIndex];
      this.widgets.splice(this.draggedIndex, 1);
      this.widgets.splice(index, 0, draggedWidget);
    }
    this.placeholderIndex = null;
    this.draggedIndex = null;
  }

  changeSize(widget: Widget, size: 'small' | 'medium' | 'large') {
    widget.size = size;
  }

  showDetailedView(widgetName: string) {
    this.detailedView = widgetName;
  }

  closeDetailedView() {
    this.detailedView = null;
  }

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  toggleFriendsList() {
    this.friendsListCollapsed = !this.friendsListCollapsed;
  }
}