import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TripGetDto } from '../../models/trip.model';
import { TripService } from '../../services/Trip/trip.service';
import { CommonModule } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-trip-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
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

  submitForm(): void {
    if (this.tripForm.invalid) {
      this.markFormGroupTouched(this.tripForm);
      this.showError('Please fill all required fields correctly');
      return;
    }
  
    const formValue = this.tripForm.value;
    const formData = new FormData();
  
    // Generate a unique TripId for new trips
    const tripId = this.editingTripId || uuidv4();
    
    // Append TripId for both create and update
    formData.append('TripId', tripId);
  
    // Append all basic fields
    formData.append('Name', formValue.name);
    formData.append('Description', formValue.description || '');
    formData.append('StartDate', new Date(formValue.startDate).toISOString());
    formData.append('EndDate', new Date(formValue.endDate).toISOString());
    formData.append('Money', formValue.money.toString());
    formData.append('AvailablePeople', formValue.availablePeople.toString());
    formData.append('MaxPeople', formValue.maxPeople.toString());
    
    // Process included/excluded items
    const includedItems = formValue.includedItems?.split('\n')
      .map((i: string) => i.trim())
      .filter(Boolean) || [];
    const excludedItems = formValue.excludedItems?.split('\n')
      .map((i: string) => i.trim())
      .filter(Boolean) || [];
    
    formData.append('IncludedItems', JSON.stringify(includedItems));
    formData.append('ExcludedItems', JSON.stringify(excludedItems));
  
    // Append images if any are selected - use 'TripImages' for create and 'Images' for update
    const imageFieldName = this.editingTripId ? 'Images' : 'TripImages';
    this.selectedImages.forEach((image, index) => {
      formData.append(imageFieldName, image, image.name || `image-${index}`);
    });
  
    // Debug: Log FormData contents
    this.logFormData(formData);
  
    if (this.editingTripId) {
      // Update existing trip - send to base endpoint without ID in URL
      this.tripService.updateTrip(formData).subscribe({
        next: () => {
          this.showSuccess('Trip updated successfully');
          this.loadTrips();
          this.resetForm();
        },
        error: (error) => {
          this.handleSubmissionError(error);
        }
      });
    } else {
      // Create new trip
      this.tripService.createTrip(formData).subscribe({
        next: () => {
          this.showSuccess('Trip created successfully');
          this.loadTrips();
          this.resetForm();
        },
        error: (error) => {
          this.handleSubmissionError(error);
        }
      });
    }
  }
  
  private logFormData(formData: FormData): void {
    console.log('--- FormData Contents ---');
    formData.forEach((value, key) => {
      console.log(key, value);
    });
    console.log('-------------------------');
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
      includedItems: trip.includedItems?.join('\n') || '',  
      excludedItems: trip.excludedItems?.join('\n') || ''   
    });
    
    // Scroll to form for better UX
    document.getElementById('trip-form')?.scrollIntoView({ behavior: 'smooth' });
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

  private formatDateForInput(date: Date): string {
    return date.toISOString().split('T')[0];
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
    alert(message);
  }

  private handleSubmissionError(error: any): void {
    let errorMessage = 'Failed to save trip. Please check your data.';
    
    if (error.error) {
      if (typeof error.error === 'string') {
        errorMessage = error.error;
      } else if (error.error.errors) {
        const errorList = Object.values(error.error.errors).flat();
        errorMessage = errorList.join('\n');
      } else if (error.error.message) {
        errorMessage = error.error.message;
      }
    }
    
    this.showError(errorMessage);
    console.error('Submission error:', error);
  }

  // Pagination and search methods
  onSearch(): void {
    if (!this.searchTerm) {
      this.filteredTrips = [...this.trips];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredTrips = this.trips.filter(trip =>
        trip.name.toLowerCase().includes(term) ||
        (trip.description && trip.description.toLowerCase().includes(term))
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

 

  getPaginationPages(): number[] {
    const pages = [];
    const total = this.totalPages();
    
    pages.push(this.currentPage);
    
    if (this.currentPage > 1) {
      pages.unshift(this.currentPage - 1);
    }
    
    if (this.currentPage < total) {
      pages.push(this.currentPage + 1);
    }
    
    return pages;
  }
}