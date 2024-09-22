import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FriendsListComponent } from '../friends-list/friends-list.component';
import { WidgetComponent } from '../widget/widget.component';

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
    WidgetComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  widgets: Widget[] = [
    { id: 1, size: 'small', name: 'Widget 1', description: 'This is widget 1' },
    { id: 2, size: 'medium', name: 'Widget 2', description: 'This is widget 2' },
    { id: 3, size: 'large', name: 'Widget 3', description: 'This is widget 3' },
    { id: 4, size: 'large', name: 'Widget 4', description: 'This is widget 4' },
  ];

  draggedIndex: number | null = null;
  placeholderIndex: number | null = null;

  changeSize(widget: Widget, size: 'small' | 'medium' | 'large') {
    widget.size = size;
  }

  onDragStart(event: DragEvent, index: number) {
    this.draggedIndex = index;
    event.dataTransfer?.setData('text/plain', index.toString());
  }

  onDragOver(event: DragEvent, index: number) {
    event.preventDefault();
    if (this.placeholderIndex !== index) {
      this.placeholderIndex = index;
    }
  }

  onDragLeave(event: DragEvent) {
    this.placeholderIndex = null;
  }

  onDrop(event: DragEvent, index: number) {
    event.preventDefault();
    const draggedIndex = this.draggedIndex;
    if (draggedIndex !== null && draggedIndex !== index) {
      const draggedWidget = this.widgets[draggedIndex];
      this.widgets.splice(draggedIndex, 1);
      this.widgets.splice(index, 0, draggedWidget);
    }
    this.draggedIndex = null;
    this.placeholderIndex = null;
  }
}