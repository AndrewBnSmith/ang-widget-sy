import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() widgets: { size: string; route: string; title: string; icon: string }[] = [];
  @Input() isEditing: boolean = false;
  @Output() toggleEditing = new EventEmitter<void>();
  @Output() addWidget = new EventEmitter<{ size: string; route: string; title: string; icon: string }>();

  isCollapsed = true;
  // isSliderOpen = false;
  activeTab: string = 'dashboard'; // Set 'dashboard' as the default active tab

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleSlider() {
    // this.isSliderOpen = !this.isSliderOpen;
  }

  handleNewWidget(widget: { size: string; route: string; title: string; icon: string }) {
    this.addWidget.emit(widget);
    // this.isSliderOpen = false;
  }

  setActiveTab(route: string) {
    this.activeTab = route;
  }
}