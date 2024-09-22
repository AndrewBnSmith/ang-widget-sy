import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FriendsListComponent } from '../friends-list/friends-list.component';
import { WidgetComponent } from '../widget/widget.component'; // Assuming you have a WidgetComponent

interface Widget {
  id: number;
  size: string;
  // Add other properties as needed
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
    { id: 1, size: 'small' },
    { id: 2, size: 'medium' },
    { id: 3, size: 'large' }
    // Add other widgets as needed
  ];
}