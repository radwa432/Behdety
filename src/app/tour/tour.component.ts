// tour.component.ts
import { Component, OnInit } from '@angular/core';
import { TripService } from '../services/Trip/trip.service';
import { TripGetDto } from '../models/trip.model';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  imports: [CommonModule],
  styleUrls: ['./tour.component.css']
})
export class TourComponent implements OnInit {
  trips: TripGetDto[] = [];
  currentPage = 1;
  isLoading = true;
  errorMessage: string | null = null;

  constructor(private tripService: TripService,private router:Router) { }

  ngOnInit(): void {
    this.loadTrips();
  }

  loadTrips(): void {
    this.isLoading = true;
    this.errorMessage = null;
    
    this.tripService.getTrips(this.currentPage).subscribe({
      next: (trips) => {
        this.trips = trips;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading trips:', err);
        this.errorMessage = 'Failed to load trips. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  getShortDescription(description: string): string {
    if (!description) return 'No description available';
    return description.length > 100 
      ? description.substring(0, 100) + '...' 
      : description;
  }

  getMainImage(trip: TripGetDto): string {
    if (trip.tripImages && trip.tripImages.length > 0 && trip.tripImages[0].imageUrl) {
      // Handle both relative and absolute URLs
      const imageUrl = trip.tripImages[0].imageUrl.startsWith('http') 
        ? trip.tripImages[0].imageUrl
        : `/${trip.tripImages[0].imageUrl}`.replace('//', '/');
      
      return imageUrl;
    }
    return 'assets/images/1.jpg';
  }

  navigateToOverview(trip: TripGetDto): void {
    this.router.navigate(['/Overview', trip.tripId], {
      state: { tripData: trip }
    });
  }
}