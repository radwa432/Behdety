import { Component, OnInit } from '@angular/core';

import { Site, SiteService } from '../services/site-2.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tour',
  imports: [RouterLink],
  templateUrl: './tour.component.html',
  styleUrls:  ['./tour.component.css']
})
export class TourComponent implements OnInit {
  sites: Site[] = [];

  constructor(private siteService: SiteService) {}

  ngOnInit(): void {
    this.siteService.getSites(1).subscribe({
      next: (data) => {
        this.sites = data;
      },
      error: (err) => {
        console.error('Error fetching sites:', err);
      }
    });
  }
  tourPlans = [
    { name: 'Historic Europe', description: 'Explore the rich history of Europe including Rome, Paris, and Athens over 12 days.' },
    { name: 'Tropical Paradise', description: 'A 7-day journey through the stunning beaches of Bali and the Maldives.' },
    { name: 'Wild Safari', description: 'Experience the wild beauty of Africa with guided safaris and local adventures.' },
    { name: 'Cultural Asia', description: 'Dive into the culture of Japan, Korea, and China in this immersive 10-day tour.' },
    { name: 'American Road Trip', description: 'Travel the iconic Route 66 and enjoy the American dream across 8 states.' }
  ];

  generateArray(rating: number): number[] {
    return Array(Math.floor(rating));
  }

  hasHalfStar(rating: number): boolean {
    return rating % 1 !== 0;
  }

}
