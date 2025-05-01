import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Pipe } from '@angular/core';

@Component({
  selector: 'app-booking-dashboard',
  imports: [ FormsModule, RouterModule,CommonModule],
  templateUrl: './booking-dashboard.component.html',
  styleUrl: './booking-dashboard.component.css'
})
export class BookingDashboardComponent implements OnInit {

  bookings: Book[] = [];
  isLoading = true;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.fetchBookings();
  }

  fetchBookings(): void {
    this.bookService.getAllBookings().subscribe({
      next: (data) => {
        this.bookings = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching bookings:', err);
        this.isLoading = false;
      }
    });
  }



  deleteBooking(bookId: string) {
    if (confirm('Are you sure you want to delete this booking?')) {
      this.bookService.deleteBook(bookId).subscribe({
        next: () => {
          this.bookings = this.bookings.filter(b => b.bookId !== bookId); //  
          alert('Booking deleted successfully');
        },
        error: (err) => {
          console.error('Delete failed', err);
          alert('Failed to delete booking');
        }
      });
    }
  }
}
