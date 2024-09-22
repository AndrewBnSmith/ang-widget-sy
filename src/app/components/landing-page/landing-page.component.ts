import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FooterComponent } from '../footer-component/footer-component.component'; // Correct import path

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [FooterComponent], // Add FooterComponent to imports
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit, OnDestroy {
  randomImage!: string;
  private intervalId: any;

  @ViewChild('cardsContainer', { static: true }) cardsContainer!: ElementRef;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Commenting out the rotateCards logic
    // this.intervalId = setInterval(() => {
    //   this.rotateCards();
    // }, 3000);

    const images = ['../assets/landingOne.svg', '../assets/todoLarge.svg', '../assets/listLarge.svg', '../assets/eventsLarge.svg'];
    this.randomImage = images[Math.floor(Math.random() * images.length)];
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  // private rotateCards(): void {
  //   if (this.cardsContainer && this.cardsContainer.nativeElement) {
  //     const cardsContainer = this.cardsContainer.nativeElement;
  //     const lastCard = cardsContainer.lastElementChild;
  //     if (lastCard) {
  //       cardsContainer.insertBefore(lastCard, cardsContainer.firstElementChild);
  //     }
  //   } else {
  //     console.error('cardsContainer or cardsContainer.nativeElement is not defined');
  //   }
  // }

  handleLogin(event: any): void {
    this.router.navigate(['/dashboard']); // Navigate to dashboard
  }

  navigateToSignup(): void {
    this.router.navigate(['/signup']);
  }

  navigateToWidgets(): void {
    this.router.navigate(['/widgets']);
  }
}