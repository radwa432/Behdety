import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent  {
  reviews = [
    {
      text: "Exploring Egypt with this tour was a dream come true! The itinerary was well-planned, covering iconic sites like Luxor, Aswan, and the Red Sea. The accommodations were top-notch, and the local cuisine was amazing. I can't wait to visit again!",
      name: "Sarah Johnson",
      avatar: "assets/images/avatars/customer1.jpg"
    },
    {
      text: "The attention to detail was incredible. Our guide was so knowledgeable about Egyptian history. The Nile cruise was the highlight of our trip - waking up to those views every morning was magical!",
      name: "Michael Chen",
      avatar: "assets/images/avatars/customer2.jpg"
    },
    {
      text: "As a solo female traveler, I felt completely safe and cared for throughout my journey. The team went above and beyond to make sure I had an authentic Egyptian experience. Highly recommend!",
      name: "Emma Rodriguez",
      avatar: "assets/images/avatars/customer3.jpg"
    }
  ];

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
    this.currentIndex = (this.currentIndex + 1) % this.reviews.length;
    this.currentPosition = -this.currentIndex * 100;
  }

  goToReview(index: number) {
    this.currentIndex = index;
    this.currentPosition = -this.currentIndex * 100;
    clearInterval(this.interval);
    this.startCarousel();
  }
}
