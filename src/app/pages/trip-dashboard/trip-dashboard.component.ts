// trip-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TripCreateDto, TripGetDto, TripUpdateDto } from '../../models/trip.model';
import { TripService } from '../../services/Trip/trip.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-trip-dashboard',
  templateUrl: './trip-dashboard.component.html',
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
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

  tripForm: FormGroup;

  constructor(
    private tripService: TripService,
    private fb: FormBuilder
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

  submitForm(): void {
    if (this.tripForm.invalid) return;

    const formValue = this.tripForm.value;
    const includedItems = formValue.includedItems
      ? formValue.includedItems.split(',').map((item: string) => item.trim()).filter(Boolean)
      : [];
    const excludedItems = formValue.excludedItems
      ? formValue.excludedItems.split(',').map((item: string) => item.trim()).filter(Boolean)
      : [];

    if (this.editingTripId) {
      const updateDto: TripUpdateDto = {
        tripId: this.editingTripId,
        name: formValue.name,
        description: formValue.description,
        startDate: new Date(formValue.startDate),
        endDate: new Date(formValue.endDate),
        duration: this.calculateDuration(formValue.startDate, formValue.endDate),
        money: formValue.money,
        availablePeople: formValue.availablePeople,
        maxPeople: formValue.maxPeople,
        includedItems: includedItems,
        excludedItems: excludedItems
      };

      this.tripService.updateTrip(updateDto).subscribe({
        next: () => {
          this.loadTrips();
          this.resetForm();
        },
        error: (err) => {
          this.showError('Failed to update trip: ' + err.message);
        }
      });
    } else {
      const createDto: TripCreateDto = {
        tripId: this.generateId(),
        name: formValue.name,
        description: formValue.description,
        startDate: new Date(formValue.startDate),
        endDate: new Date(formValue.endDate),
        duration: this.calculateDuration(formValue.startDate, formValue.endDate),
        money: formValue.money,
        availablePeople: formValue.availablePeople,
        maxPeople: formValue.maxPeople,
        includedItems: includedItems,
        excludedItems: excludedItems
      };

      this.tripService.createTrip(createDto).subscribe({
        next: () => {
          this.loadTrips();
          this.resetForm();
        },
        error: (err) => {
          this.showError('Failed to create trip: ' + err.message);
        }
      });
    }
  }

  editTrip(trip: TripGetDto): void {
    this.editingTripId = trip.tripId;
    this.tripForm.patchValue({
      name: trip.name,
      description: trip.description,
      startDate: this.formatDateForInput(trip.startDate),
      endDate: this.formatDateForInput(trip.endDate),
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
          this.loadTrips();
        },
        error: (err) => {
          this.showError('Failed to delete trip: ' + err.message);
        }
      });
    }
  }

  cancelEdit(): void {
    this.editingTripId = null;
    this.resetForm();
  }

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

  totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
  }

  private resetForm(): void {
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
  }

  private calculateDuration(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  private formatDateForInput(date: Date): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  private showError(message: string): void {
    this.errorMessage = message;
    console.error(message);
    setTimeout(() => this.errorMessage = '', 5000);
  }
}
