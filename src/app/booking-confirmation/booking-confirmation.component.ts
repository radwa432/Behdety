// booking-confirmation.component.ts
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../services/book.service';
import { Book } from '../models/book';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-confirmation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="confirmation-container">
      <h2>Booking Confirmed!</h2>
      <div *ngIf="booking; else loading">
        <p>Booking ID: {{ booking.bookId }}</p>
        <p>Trip: {{ booking.tripName }}</p>
        <p>Dates: {{ booking.startComingDate | date }} to {{ booking.endComingDate | date }}</p>
        <p>Number of People: {{ booking.numberPeople }}</p>
        <p>Total Amount: {{ booking.amountMoney | currency }}</p>
      </div>
      <ng-template #loading>
        <p>Loading booking details...</p>
      </ng-template>
    </div>
  `,
  styleUrls: ['./booking-confirmation.component.css']
})
export class BookingConfirmationComponent {
  booking: Book | null = null;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {
    const bookingId = this.route.snapshot.paramMap.get('id');
    if (bookingId) {
      this.loadBooking(bookingId);
    }
  }

  loadBooking(bookingId: string) {
    this.bookService.getBooking(bookingId).subscribe({
      next: (booking) => {
        this.booking = booking;
      },
      error: (err) => {
        console.error('Failed to load booking:', err);
      }
    });
  }
}
