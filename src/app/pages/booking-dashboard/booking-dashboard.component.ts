
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { BookingService } from '../../services/bookingdashboard/booking-dashboard.service';
import { BookDetailDto } from '../../models/book';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking-management',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './booking-dashboard.component.html',
  styleUrls: ['./booking-dashboard.component.css']
})
export class BookingManagementComponent implements OnInit {
  bookings: BookDetailDto[] = [];
  loading = true;

  constructor(
    private bookingService: BookingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchBookings();
  }

  fetchBookings() {
    this.loading = true;
    this.bookingService.getBookings().subscribe({
      next: data => { this.bookings = data; this.loading = false; },
      error: () => this.loading = false
    });
  }

  onEdit(id: string) {
    this.router.navigate(['/dashboard/booking-management/edit', id]);
  }

  onDelete(id: string) {
    if (confirm('Are you sure you want to delete this booking?')) {
      this.bookingService.deleteBooking(id).subscribe({
        next: () => this.fetchBookings()
      });
    }
  }

  onCreate() {
    this.router.navigate(['/dashboard/booking-management/create']);
  }
}
