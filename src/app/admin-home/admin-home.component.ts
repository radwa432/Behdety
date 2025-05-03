/*import { Component } from '@angular/core';
import { BookingService } from '../services/bookingdashboard/booking-dashboard.service';
import { BookDetailDto } from '../models/book';
import { Router } from '@angular/router';
import{TripService} from '../services/Trip/trip.service';
import { TripGetDto } from '../models/trip.model';
import { BlogService } from '../services/blog.service';
import { BlogPost } from '../models/blog-post.model';
@Component({
  selector: 'app-admin-home',
  imports: [],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {
  bookings: BookDetailDto[] = [];
  trips: TripGetDto[] = [];
  blogPosts: BlogPost[] = [];
  loading = true;
  currentPage = 1;
  isLoading = true;
  errorMessage: string | null = null;

  pageNumber = 1;
  pageSize = 8;
  totalPages = 0;
  totalCount = 0;
  constructor(
    private bookingService: BookingService,
    private tripService: TripService,
    private blogService: BlogService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchBookings();
    this.loadTrips();
    this.loadPosts();
  }
  loadPosts(): void {
    this.blogService.getPosts(this.pageNumber, this.pageSize, '', undefined).subscribe(response => {
      this.blogPosts = response.data;
      this.totalCount = response.totalCount;
      this.totalPages = Math.ceil(this.totalCount / this.pageSize);
    });
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
  fetchBookings() {
    this.loading = true;
    this.bookingService.getBookings().subscribe({
      next: data => { this.bookings = data; this.loading = false; },
      error: () => this.loading = false
    });
  }
  getBookingStatus(booking: BookDetailDto): string {
    const today = new Date();
    const startDate = new Date(booking.startComingDate);
    const endDate = new Date(booking.endComingDate);

    if (today < startDate) {
      return 'Upcoming';
    } else if (today > endDate) {
      return 'Expired';
    } else {
      return 'Ongoing';
    }
  }

}
*/


import { Component, OnInit } from '@angular/core';
import { DashboardHomeService } from '../services/dashboard-home.service';
import { Pipe } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-home',
  imports: [ CommonModule],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent implements OnInit {
  stats: any;
  recentBookings: any[] = [];

  constructor(private dashboard: DashboardHomeService) {}

  ngOnInit(): void {
    this.dashboard.getStats().subscribe(data => this.stats = data);
    this.dashboard.getRecentBookings().subscribe(data => this.recentBookings = data as any[]);
  }
}