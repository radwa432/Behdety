import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent  {
  currentIndex = 0;
  currentPosition = 0;
  interval: any;

  ngOnInit() {
    this.startCarousel();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  startCarousel() {
    this.interval = setInterval(() => {
      this.nextReview();
    }, 5000); // Change every 5 seconds
  }

  nextReview() {
    this.currentIndex = (this.currentIndex + 1) % 3;
    this.currentPosition = -this.currentIndex * 100;
  }

  goToReview(index: number) {
    this.currentIndex = index;
    this.currentPosition = -this.currentIndex * 100;
    clearInterval(this.interval);
    this.startCarousel();
  }
 
}
