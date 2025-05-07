import { BookDetailDto } from './../models/book';
import { BookService } from './../services/book.service';

import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, computed, signal, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../services/payment.service';
import { BookingResponse, PaymentIntentResponse } from '../models/book';
import { TripGetDto } from '../models/trip.model';
import { TripService } from '../services/Trip/trip.service';


@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule,CurrencyPipe,ReactiveFormsModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent implements OnInit, AfterViewInit {
  @ViewChild('mainImageContainer') mainImageContainer!: ElementRef;
  mainImageHeight = 0;
  bookingForm: FormGroup;
  currentImageIndex = 0;
  showAllThumbnails = false;
  maxVisibleThumbnails = 4;

  currentTrip!: TripGetDto;
  tourName: string = '';
  money: number = 0;
  images: { main: string, thumb: string }[] = [];
  includedItems: string[] = [];
  excludedItems: string[] = [];
  tourPlans = [
    { name: 'Day 1', description: 'Arrival and orientation' },
    { name: 'Day 2', description: 'Main activities and exploration' },
    { name: 'Day 3', description: 'Final experiences and departure' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private paymentService: PaymentService,
    private tripService: TripService
  ) {
    this.bookingForm = new FormGroup({
      tourName: new FormControl({ value: this.tourName, disabled: true }, [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required, this.endDateAfterStartDateValidator('startDate')]),
      groupSize: new FormControl('', [Validators.required, Validators.min(1)]),
      numberOfDays: new FormControl('', [Validators.required, Validators.min(1)]),
      price: new FormControl({value:0,disabled:true}, [Validators.required, Validators.min(1)]),
    });

    this.bookingForm.get('startDate')?.valueChanges.subscribe(() => this.calculateDays());
    this.bookingForm.get('endDate')?.valueChanges.subscribe(() => this.calculateDays());
  }

  ngOnInit(): void {
    const tripData = history.state.tripData;
    if (tripData) {
      this.currentTrip = tripData;
      this.initializeTripData();
    } else {
      const tripId = this.route.snapshot.paramMap.get('id');
      if (tripId) {
        this.tripService.getTripById(tripId).subscribe({
          next: (trip) => {
            this.currentTrip = trip;
            this.initializeTripData();
          },
          error: (err) => {
            console.error('Error loading trip:', err);
            this.router.navigate(['/tours']);
          }
        });
      }
    }
  }

  initializeTripData(): void {
    this.tourName = this.currentTrip.name;
    this.bookingForm.patchValue({ tourName: this.tourName, price: (this.currentTrip.money) });
    
    this.images = this.currentTrip.tripImages?.map(img => ({
      main: img.imageUrl,
      thumb: img.imageUrl
    })) || [];

    this.includedItems = this.currentTrip.includedItems || [];
    this.excludedItems = this.currentTrip.excludedItems || [];
  }
calculateDays() {
  const startDate = this.bookingForm.get('startDate')?.value;
  const endDate = this.bookingForm.get('endDate')?.value;

  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    this.bookingForm.patchValue({
      numberOfDays: diffDays
    });
  }
}

// overview.component.ts
onSubmit() {
  if (this.bookingForm.invalid) {
    this.markFormGroupTouched(this.bookingForm);
    return;
  }

  if (this.dateControle()) {
    return;
  }

  const formData = {
    tripName: this.bookingForm.get('tourName')?.value,
    startComingDate: this.formatDate(this.bookingForm.get('startDate')?.value),
    endComingDate: this.formatDate(this.bookingForm.get('endDate')?.value),
    numberPeople: this.bookingForm.get('groupSize')?.value,
    numberDays: this.bookingForm.get('numberOfDays')?.value,
    amountMoney: this.bookingForm.get('price')?.value
  };

  this.bookService.createBooking(formData).subscribe({
    next: (bookingResponse: BookingResponse) => {
      const baseUrl = window.location.origin;

      this.paymentService.createCheckoutSession(
        bookingResponse.bookId,
        bookingResponse.tripId,
        bookingResponse.amountMoney,
        baseUrl
      ).subscribe({
        next: (response) => {
          // Redirect to Stripe Checkout
          window.location.href = response.url;
        },
        error: (paymentError) => {
          console.error('Payment error:', paymentError);
          alert('Error creating payment session. Please try again.');
        }
      });
    },
    error: (bookingError) => {
      this.bookingError(bookingError);
    }
  });
}
bookingSuccess(response: any) {
  // Show success message
  alert('Booking created successfully!');

  // Optionally navigate to confirmation page
  // this.router.navigate(['/booking-confirmation', response.bookId]);

  // Reset form
  this.bookingForm.reset({
    tourName: this.tourName
  });
}

bookingError(error: any) {
  console.error('Booking error:', error);
  alert('Error creating booking. Please try again.');
}

markFormGroupTouched(formGroup: FormGroup) {
  Object.values(formGroup.controls).forEach(control => {
    control.markAsTouched();

    if (control instanceof FormGroup) {
      this.markFormGroupTouched(control);
    }
  });
}


  // images = [
  //   { main: 'assets/images/1.jpg', thumb: 'assets/images/1.jpg' },
  //   { main: 'assets/images/tour.jpg', thumb: 'assets/images/tour.jpg' },
  //   { main: 'assets/images/1.jpg', thumb: 'assets/images/1.jpg' },
  //   { main: 'assets/images/1.jpg', thumb: 'assets/images/1.jpg' },
  //   { main: 'assets/images/tour.jpg', thumb: 'assets/images/tour.jpg' },
  //   { main: 'assets/images/1.jpg', thumb: 'assets/images/1.jpg' },
  //   { main: 'assets/images/1.jpg', thumb: 'assets/images/1.jpg' },
  //   { main: 'assets/images/tour.jpg', thumb: 'assets/images/tour.jpg' },
  //   { main: 'assets/images/1.jpg', thumb: 'assets/images/1.jpg' },

  // ];
  // tourPlans = [
  //   { name: 'Historic Europe', description: 'Explore the rich history of Europe including Rome, Paris, and Athens over 12 days.' },
  //   { name: 'Tropical Paradise', description: 'A 7-day journey through the stunning beaches of Bali and the Maldives.' },
  //   { name: 'Wild Safari', description: 'Experience the wild beauty of Africa with guided safaris and local adventures.' },
  //   { name: 'Cultural Asia', description: 'Dive into the culture of Japan, Korea, and China in this immersive 10-day tour.' },
  //   { name: 'American Road Trip', description: 'Travel the iconic Route 66 and enjoy the American dream across 8 states.' }
  // ];

  // includedItems: string[] = [
  //   'Pickup and drop-off service',
  //   'Camping equipment',
  //   'Meals during the tour',
  //   'Experienced guide'
  // ];

  // excludedItems: string[] = [
  //   'Personal expenses',
  //   'Tips',
  //   'Any extra not mentioned in the itinerary'
  // ];

  ngAfterViewInit() {
    setTimeout(() => {
      this.updateMainImageHeight();
      window.addEventListener('resize', () => {
        this.updateMainImageHeight();
      });
    });
  }

  updateMainImageHeight() {
    if (this.mainImageContainer?.nativeElement) {
      this.mainImageHeight = this.mainImageContainer.nativeElement.offsetHeight;
    }
  }

  // visibleThumbnails = computed(() => {
  //   return this.showAllThumbnails()
  //     ? this.images
  //     : this.images.slice(0, this.maxVisibleThumbnails);
  // });

  hiddenThumbnailsCount = computed(() => {
    return Math.max(0, this.images.length - this.maxVisibleThumbnails);
  });

  get currentImage() {
    return this.images[this.currentImageIndex];
  }

  nextImage(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
  }

  prevImage(): void {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
  }

  // selectImage(index: number): void {
  //   this.currentImageIndex = index;
  //   if (!this.showAllThumbnails() && index >= this.maxVisibleThumbnails) {
  //     this.showAllThumbnails.set(true);
  //   }
  // }

  private formatDate(date: string): string {
    // Format date to YYYY-MM-DD for API
    return new Date(date).toISOString().split('T')[0];
  }



  dateControle(){
    const startDate = this.bookingForm.get('startDate')?.value;
    const endDate = this.bookingForm.get('endDate')?.value;
    if (startDate && endDate) {
      return new Date(startDate) > new Date(endDate);
    }
    if(startDate<endDate){
      alert('Start date should be less than end date.');
      return false;
    }
    alert('Please select both start and end dates.');
    return false;
  }

   endDateAfterStartDateValidator(startDateControlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const startDate = control.parent?.get(startDateControlName)?.value;
      const endDate = control.value;

      if (!startDate || !endDate) {
        return null; // Don't validate if either date is empty
      }

      return new Date(endDate) < new Date(startDate)
        ? { endDateBeforeStart: true }
        : null;
    };

   }}