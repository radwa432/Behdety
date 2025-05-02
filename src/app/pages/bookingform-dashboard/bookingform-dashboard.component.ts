import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule, RouterLink } from '@angular/router';
import { BookingService } from '../../services/bookingdashboard/booking-dashboard.service';
import { CreateBookDto } from '../../models/book';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, RouterLink],
  templateUrl: './bookingform-dashboard.component.html',
  styleUrls: ['./bookingform-dashboard.component.css']
})
export class BookingFormComponent implements OnInit {
  form: ReturnType<FormBuilder['group']>;
  isEdit = false;
  bookingId: string | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly bookingService: BookingService,
    private readonly route: ActivatedRoute,
    readonly router: Router
  ) {
    // 🔄 حركنا إنشاء الـ Form إلى الـ constructor بعد تهيئة fb
    this.form = this.fb.group({
      tripName: ['', Validators.required],
      startComingDate: ['', Validators.required],
      endComingDate: ['', Validators.required],
      numberPeople: [1, [Validators.required, Validators.min(1)]],
      numberDays: [null as number | null],
      amountMoney: [null as number | null]
    });
  }

  ngOnInit(): void {
    this.bookingId = this.route.snapshot.paramMap.get('id');
    if (this.bookingId) {
      this.isEdit = true;
      this.bookingService.getBooking(this.bookingId).subscribe(b => {
        this.form.patchValue({
          tripName: b.tripName,
          startComingDate: b.startComingDate,
          endComingDate: b.endComingDate,
          numberPeople: b.numberPeople,
          numberDays: b.numberDays ?? null,        
          amountMoney: b.amountMoney ?? null       
        });
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const dto: CreateBookDto = this.form.value as CreateBookDto;

    const redirect = () => this.router.navigate(['/dashboard/booking-management']);

    if (this.isEdit && this.bookingId) {
      this.bookingService.updateBooking(this.bookingId, dto).subscribe(redirect);
    } else {
      this.bookingService.createBooking(dto).subscribe(redirect);
    }
  }
}
