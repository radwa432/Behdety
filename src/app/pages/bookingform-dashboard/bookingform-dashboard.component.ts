import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-bookingform-dashboard',
  imports: [ CommonModule, FormsModule, RouterModule, ReactiveFormsModule ],
  templateUrl: './bookingform-dashboard.component.html',
  styleUrl: './bookingform-dashboard.component.css'
})
export class BookingformDashboardComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  bookingId!: string;
  trips: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      tripName: ['', Validators.required],
      numberPeople: [1, Validators.required],
      startComingDate: ['', Validators.required],
      endComingDate: ['', Validators.required],
    });

    // تحميل الرحلات
    this.loadAllTrips();

    // إذا كان فيه ID --> Edit
    this.bookingId = this.route.snapshot.paramMap.get('id')!;
    if (this.bookingId) {
      this.isEdit = true;
      this.bookService.getBooking(this.bookingId).subscribe(booking => {
        this.form.patchValue({
          tripName: booking.tripName,
          numberPeople: booking.numberPeople,
          startComingDate: booking.startComingDate,
          endComingDate: booking.endComingDate,
        });
      });
    }
  }

  loadAllTrips() {
    let page = 1;
    let allTrips: any[] = [];
  
    const loadPage = () => {
      this.bookService.getTrips(page).subscribe(response => {
        const trips = response.items || response; // تأكد من أن الـ response يحتوي على البيانات بشكل صحيح
        if (trips && trips.length > 0) {
          allTrips = [...allTrips, ...trips];
          page++;
          loadPage(); // استدعاء الصفحة التالية
        } else {
          this.trips = allTrips; // حفظ كل الرحلات بعد الانتهاء
        }
      }, error => {
        console.error('Error loading trips:', error);
      });
    };  loadPage();
  }

  submit() {
    if (this.form.invalid) return;

    const dto = this.form.value;

    if (this.isEdit) {
      this.bookService.updateBook(this.bookingId, dto).subscribe(() => {
        alert('Booking updated!');
        this.router.navigate(['/bookings']);
      });
    } else {
      this.bookService.createBooking(dto).subscribe(() => {
        alert('Booking created!');
        this.router.navigate(['/bookings']);
      });
    }
  }
}