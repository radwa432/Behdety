import { Component, OnInit } from '@angular/core';
import { TripService } from '../services/Trip/trip.service';
import { TripGetDto } from '../models/trip.model';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./tour.component.css']
})
export class TourComponent implements OnInit {
  trips: TripGetDto[] = [];
  filteredTrips: TripGetDto[] = [];
  currentPage = 1;
  isLoading = true;
  errorMessage: string | null = null;
  
  // Search filters
  searchTerm: string = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;

  constructor(private tripService: TripService, private router: Router) { }

  ngOnInit(): void {
    this.loadTrips();
  }

  loadTrips(): void {
    this.isLoading = true;
    this.errorMessage = null;
    
    this.tripService.getTrips(this.currentPage).subscribe({
      next: (trips) => {
        this.trips = trips;
        this.filteredTrips = [...this.trips];
        this.isLoading = false;
        this.applyFilters(); // Apply any existing filters
      },
      error: (err) => {
        console.error('Error loading trips:', err);
        this.errorMessage = 'Failed to load trips. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  applyFilters(): void {
    this.filteredTrips = this.trips.filter(trip => {
      // Filter by search term (name or description)
      const matchesSearch = !this.searchTerm || 
        trip.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
        trip.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      // Filter by price range
      const matchesMinPrice = !this.minPrice || trip.money >= this.minPrice;
      const matchesMaxPrice = !this.maxPrice || trip.money <= this.maxPrice;
      
      return matchesSearch && matchesMinPrice && matchesMaxPrice;
    });
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.minPrice = null;
    this.maxPrice = null;
    this.filteredTrips = [...this.trips];
  }

  getShortDescription(description: string): string {
    if (!description) return 'No description available';
    return description.length > 100 
      ? description.substring(0, 100) + '...' 
      : description;
  }

  getMainImage(trip: TripGetDto): string {
    if (trip.tripImages && trip.tripImages.length > 0 && trip.tripImages[0].imageUrl) {
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