// import { Component, OnInit } from '@angular/core';

// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { TripService } from '../../services/Trip/trip.service';
// import { CommonModule } from '@angular/common';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// interface Trip {
//   tripId: string;
//   name: string;
//   description: string;
//   startDate: string;
//   endDate: string;
//   duration: number;
//   money: number;
//   availablePeople: number;
//   maxPeople: number;
//   isDeleted: boolean;
//   outOfDate: boolean;
//   includedItems: string[];
//   excludedItems: string[];
//   sites: number[];
// }
// @Component({
//   selector: 'app-trip-dashboard',
//   templateUrl: './trip-dashboard.component.html',
//   styleUrls: ['./trip-dashboard.component.css'],
//   standalone: true,
//   imports: [CommonModule, FormsModule, ReactiveFormsModule]
// })
// export class TripDashboardComponent implements OnInit {
//   tripForm: FormGroup;
//   trips: any[] = [];
//   editingTripId: string | null = null;
//   currentPage: number = 1;
//   pageSize: number = 8;
//   searchTerm: string = '';

//   constructor(
//     private fb: FormBuilder,
//     private tripService: TripService
//   ) {
//     this.tripForm = this.fb.group({
//       id: [''], // Add this line for the ID
//       name: ['', [Validators.required, Validators.minLength(3)]],
//       description: ['', Validators.required],
//       startDate: ['', Validators.required],
//       endDate: ['', Validators.required],
//       money: [0, [Validators.required, Validators.min(0)]],
//       availablePeople: [0, [Validators.required, Validators.min(0)]],
//       maxPeople: [1, [Validators.required, Validators.min(1)]],
//       includedItems: [''],
//       excludedItems: [''],
//       sites: ['']
//     });
//   }

//   ngOnInit(): void {
//     this.loadTrips();
//   }

// // In your TripDashboardComponent
// // In your component
// loadTrips(pageNumber: number = 1): void {
//   this.tripService.getTrips(pageNumber).subscribe({
//     next: (trips) => {
//       this.trips = trips;
//     },
//     error: (err) => {
//       console.error('Error loading trips:', err);
//       // Handle error appropriately
//     }
//   });
// }

// // When changing pages
// changePage(page: number): void {
//   this.currentPage = page;
//   this.loadTrips();
// }

// submitForm(): void {
//   if (this.tripForm.invalid) return;

//   const formValue = this.tripForm.value;

//   const tripData = {
//     name: formValue.name,
//     description: formValue.description,
//     startDate: this.formatDate(formValue.startDate),
//     endDate: this.formatDate(formValue.endDate),
//     duration: this.calculateDuration(formValue.startDate, formValue.endDate),
//     money: formValue.money,
//     availablePeople: formValue.availablePeople,
//     maxPeople: formValue.maxPeople,
//     isDeleted: false,
//     outOfDate: false,
//     includedItems: formValue.includedItems
//       ? formValue.includedItems.split(',').map(item => item.trim()).filter(Boolean)
//       : [],
//     excludedItems: formValue.excludedItems
//       ? formValue.excludedItems.split(',').map(item => item.trim()).filter(Boolean)
//       : [],
//     sites: formValue.sites
//       ? formValue.sites.split(',').map(site => parseInt(site.trim())).filter(n => !isNaN(n))
//       : [],
//     tripId: formValue.id
//   };

//   const observable = formValue.id
//     ? this.tripService.updateTrip({ ...tripData, tripId: formValue.id })
//     : this.tripService.createTrip(tripData);

//   observable.subscribe({
//     next: () => {
//       this.loadTrips();
//       this.tripForm.reset();
//       this.editingTripId = null;
//       alert('Operation completed successfully');
//     },
//     error: (err) => {
//       console.error('Error:', err);
//       if (err.error) {
//         console.error('Server response:', err.error);
//       }
//       alert('An error occurred. Please check console for details.');
//     }
//   });
// }
// // Add these methods to your component class
// private handleSuccess(): void {
//   this.loadTrips();
//   this.tripForm.reset();
//   this.editingTripId = null;
//   alert('Operation completed successfully');
// }

// private handleError(err: any): void {
//   console.error('Error:', err);
//   if (err.error) {
//     console.error('Server response:', err.error);
//   }
//   alert('An error occurred. Please check console for details.');
// }

//   // Helper method to format dates
//   private formatDate(dateString: string): string {
//     if (!dateString) return '';
//     const date = new Date(dateString);
//     return date.toISOString().split('T')[0]; // YYYY-MM-DD format
//   }

//   private calculateDuration(startDate: string, endDate: string): number {
//     const start = new Date(startDate);
//     const end = new Date(endDate);
//     return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
//   }


//   editTrip(trip: Trip): void {
//     this.editingTripId = trip.tripId;
//     this.tripForm.patchValue({
//       id: trip.tripId, // Map to form's 'id' field
//       name: trip.name,
//       description: trip.description,
//       startDate: trip.startDate.split('T')[0],
//       endDate: trip.endDate.split('T')[0],
//       money: trip.money,
//       availablePeople: trip.availablePeople,
//       maxPeople: trip.maxPeople,
//       includedItems: trip.includedItems?.join(', ') || '',
//       excludedItems: trip.excludedItems?.join(', ') || '',
//       sites: trip.sites?.join(', ') || ''
//     });
//   }
//   cancelEdit(): void {
//     this.editingTripId = null;
//     this.tripForm.reset();
//   }

//   deleteTrip(id: string): void {
//     const numericId = Number(id);
//     if (isNaN(numericId)) {
//       alert('Invalid trip ID format');
//       return;
//     }

//     if (confirm('Are you sure you want to delete this trip?')) {
//       this.tripService.deleteTrip(numericId.toString()).subscribe({
//         next: () => {
//           this.loadTrips();
//           alert('Trip deleted successfully');
//         },
//         error: (err) => {
//           console.error('Delete error:', err);
//           alert('Failed to delete trip');
//         }
//       });
//     }
//   }


//   // Pagination methods
//   get paginatedTrips(): any[] {
//     const filtered = this.searchTerm
//       ? this.trips.filter(t =>
//           t.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//           (t.tripId && t.tripId.toLowerCase().includes(this.searchTerm.toLowerCase())))
//       : this.trips;

//     const start = (this.currentPage - 1) * this.pageSize;
//     const end = start + this.pageSize;
//     return filtered.slice(start, end);
//   }

//   totalPages(): number {
//     const filtered = this.searchTerm
//       ? this.trips.filter(t =>
//           t.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//           (t.tripId && t.tripId.toLowerCase().includes(this.searchTerm.toLowerCase())))
//       : this.trips;

//     return Math.ceil(filtered.length / this.pageSize);
//   }

//   totalPagesArray(): number[] {
//     return Array(this.totalPages()).fill(0).map((_, i) => i + 1);
//   }
// }
