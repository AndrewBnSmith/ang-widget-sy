import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FriendsListComponent } from './components/friends-list/friends-list.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent,
    DashboardComponent,
    FriendsListComponent,
    TopNavComponent,
    LandingPageComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angularWidgetSync-app';
}