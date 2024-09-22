import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true, // Declare as standalone component
  templateUrl: './footer-component.component.html', // Ensure this path is correct
  styleUrls: ['./footer-component.component.scss']
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
}