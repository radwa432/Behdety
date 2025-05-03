import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { TripGetDto } from '../../models/trip.model';
import { TripService } from '../../services/Trip/trip.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trip-dashboard',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './trip-dashboard.component.html',
  styleUrls: ['./trip-dashboard.component.css']
})
export class TripDashboardComponent implements OnInit {
  trips: TripGetDto[] = [];
  filteredTrips: TripGetDto[] = [];
  paginatedTrips: TripGetDto[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  searchTerm = '';
  editingTripId: string | null = null;
  errorMessage = '';
  selectedImages: File[] = [];
  previewImages: string[] = [];

  tripForm: FormGroup;

  constructor(
    private tripService: TripService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.tripForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      money: [0, [Validators.required, Validators.min(0)]],
      availablePeople: [0, [Validators.required, Validators.min(0)]],
      maxPeople: [1, [Validators.required, Validators.min(1)]],
      includedItems: [''],
      excludedItems: ['']
    });
  }
  getPaginationPages(): number[] {
    const pages = [];
    const total = this.totalPages();
    
    // Always show current page
    pages.push(this.currentPage);
    
    // Show previous page if exists
    if (this.currentPage > 1) {
      pages.unshift(this.currentPage - 1);
    }
    
    // Show next page if exists
    if (this.currentPage < total) {
      pages.push(this.currentPage + 1);
    }
    
    return pages;
  }

  ngOnInit(): void {
    this.loadTrips();
  }

  loadTrips(): void {
    this.tripService.getTrips(this.currentPage).subscribe({
      next: (trips) => {
        this.trips = trips;
        this.filteredTrips = [...trips];
        this.updatePaginatedTrips();
      },
      error: (err) => {
        this.showError('Failed to load trips: ' + err.message);
      }
    });
  }

  onFileSelected(event: any): void {
    this.selectedImages = Array.from(event.target.files);
    this.previewImages = [];
    this.selectedImages.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImages.push(e.target.result);
      };
      reader.readAsDataURL(file);
    });
  }

  async submitForm(): Promise<void> {
    try {
      if (this.tripForm.invalid) {
        this.markFormGroupTouched(this.tripForm);
        throw new Error('Please fill all required fields correctly');
      }

      const formValue = this.tripForm.value;
      const formData = new FormData();

      // Append all basic fields
      formData.append('Name', formValue.name);
      formData.append('Description', formValue.description || '');
      formData.append('StartDate', new Date(formValue.startDate).toISOString());
      formData.append('EndDate', new Date(formValue.endDate).toISOString());
      formData.append('Duration', this.calculateDuration(formValue.startDate, formValue.endDate).toString());
      formData.append('Money', formValue.money.toString());
      formData.append('AvailablePeople', formValue.availablePeople.toString());
      formData.append('MaxPeople', formValue.maxPeople.toString());
      
      // Append arrays as JSON strings
      formData.append('IncludedItems', JSON.stringify(
        formValue.includedItems?.split(',').map((i: string) => i.trim()).filter(Boolean) || []
      ));
      formData.append('ExcludedItems', JSON.stringify(
        formValue.excludedItems?.split(',').map((i: string) => i.trim()).filter(Boolean) || []
      ));

      // Append images
      if (this.selectedImages?.length) {
        this.selectedImages.forEach((image) => {
          formData.append('TripImages', image, image.name);
        });
      }

      if (this.editingTripId) {
        // Update existing trip
        formData.append('TripId', this.editingTripId);
        await this.tripService.updateTrip(this.editingTripId, formData).toPromise();
        this.showSuccess('Trip updated successfully');
      } else {
        // Create new trip
        formData.append('TripId', this.generateId());
        await this.tripService.createTrip(formData).toPromise();
        this.showSuccess('Trip created successfully');
      }

      this.loadTrips();
      this.resetForm();
      
    } catch (error) {
      console.error('Submission error:', error);
      this.showError(
        (error as any)?.error?.message ||
        (error as any)?.error ||
        (error as any)?.message ||
        'Failed to save trip. Please check your data.'
      );
    }
  }

  editTrip(trip: TripGetDto): void {
    this.editingTripId = trip.tripId;
    this.previewImages = trip.tripImages?.map(img => img.imageUrl) || [];
    this.tripForm.patchValue({
      name: trip.name,
      description: trip.description,
      startDate: this.formatDateForInput(new Date(trip.startDate)),
      endDate: this.formatDateForInput(new Date(trip.endDate)),
      money: trip.money,
      availablePeople: trip.availablePeople,
      maxPeople: trip.maxPeople,
      includedItems: trip.includedItems?.join(', '),
      excludedItems: trip.excludedItems?.join(', ')
    });
  }

  deleteTrip(id: string): void {
    if (confirm('Are you sure you want to delete this trip?')) {
      this.tripService.deleteTrip(id).subscribe({
        next: () => {
          this.showSuccess('Trip deleted successfully');
          this.loadTrips();
        },
        error: (err) => {
          this.showError('Failed to delete trip: ' + err.message);
        }
      });
    }
  }

  // Helper methods
  private generateId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  private calculateDuration(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  }

  private formatDateForInput(date: Date): string {
    return new Date(date).toISOString().split('T')[0];
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

   resetForm(): void {
    this.tripForm.reset({
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      money: 0,
      availablePeople: 0,
      maxPeople: 1,
      includedItems: '',
      excludedItems: ''
    });
    this.editingTripId = null;
    this.selectedImages = [];
    this.previewImages = [];
  }

  private showError(message: string): void {
    this.errorMessage = message;
    setTimeout(() => this.errorMessage = '', 5000);
  }

  private showSuccess(message: string): void {
    // You can implement a toast notification here
    console.log(message);
  }

  // Pagination and search methods
  onSearch(): void {
    if (!this.searchTerm) {
      this.filteredTrips = [...this.trips];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredTrips = this.trips.filter(trip =>
        trip.name.toLowerCase().includes(term) ||
        trip.description?.toLowerCase().includes(term)
      );
    }
    this.currentPage = 1;
    this.updatePaginatedTrips();
  }

  updatePaginatedTrips(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedTrips = this.filteredTrips.slice(startIndex, startIndex + this.itemsPerPage);
  }

  totalPages(): number {
    return Math.ceil(this.filteredTrips.length / this.itemsPerPage);
  }
}