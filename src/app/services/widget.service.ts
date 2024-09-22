import { Injectable } from '@angular/core';

interface Widget {
  id: number;
  size: string;
}

@Injectable({
  providedIn: 'root'
})
export class WidgetService {
  private widgets: Widget[] = [
    { id: 1, size: 'small' },
    { id: 2, size: 'medium' },
    { id: 3, size: 'large' }
  ];

  getWidgets(): Widget[] {
    return this.widgets;
  }

  updateWidgetSize(id: number, size: string): void {
    const widget = this.widgets.find(w => w.id === id);
    if (widget) {
      widget.size = size;
    }
  }
}