import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { DriverService, Driver } from '../../services/driver/driver.service';
import { TransportationService, Transportation } from '../../services/transportation/transportation.service';
import { CommonModule } from '@angular/common'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-drivers-dashboard',
  templateUrl: './drivers-dashboard.component.html',
  styleUrls: ['./drivers-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class DriversDashboardComponent implements OnInit {
  driverForm!: FormGroup;
  drivers: Driver[] = [];
  allTransportations: Transportation[] = [];
  editingDriverId: string | null = null;

  searchTerm: string = '';
  currentPage = 1;
  pageSize = 8; // Number of drivers per page
  

  constructor(
    private fb: FormBuilder,
    private driverService: DriverService,
    private transportationService: TransportationService
  ) { }

  ngOnInit(): void {
    this.loadDrivers();
    this.loadTransportations();

    this.driverForm = this.fb.group({
      name: ['', Validators.required],
      transportationId: ['', [Validators.required, this.transportationTakenValidator.bind(this)]]
    });
  }

  loadDrivers() {
    this.driverService.getAllDrivers(this.currentPage).subscribe(data => {
      this.drivers = data;
    });
  }

  loadTransportations() {
    this.transportationService.getAll().subscribe(data => {
      this.allTransportations = data;
    });
  }

  submitDriver() {
    if (this.driverForm.invalid) return;

    const driverData = {
      id: this.editingDriverId ?? '0',
      name: this.driverForm.value.name,
      transportationId: this.driverForm.value.transportationId
    };

    if (this.editingDriverId) {
      this.driverService.updateDriver(driverData).subscribe(() => {
        alert('Driver updated successfully! ');
        this.loadDrivers();
        this.cancelEditDriver();
      });
    } else {
      this.driverService.createDriver(driverData).subscribe(() => {
        alert('Driver created successfully! ');
        this.loadDrivers();
        this.driverForm.reset();
      });
    }
  }

  editDriver(driver: Driver) {
    this.editingDriverId = driver.id;
    this.driverForm.patchValue({
      name: driver.name,
      transportationId: driver.transportationId
    });
  }

  deleteDriver(id: string) {
    if (confirm('Are you sure you want to delete this driver?')) {
      this.driverService.deleteDriver(id).subscribe(() => {
        this.loadDrivers();
      });
    }
  }

  cancelEditDriver() {
    this.editingDriverId = null;
    this.driverForm.reset();
  }

  get filteredDrivers() {
    if (!this.searchTerm) return this.drivers;
    return this.drivers.filter(driver =>
      driver.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  get pagedDrivers() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredDrivers.slice(start, start + this.pageSize);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.loadDrivers();
  }
  //  Custom Validator to check if transportation is already taken
  transportationTakenValidator(control: AbstractControl) {
    if (!control.value) return null;

    const selectedTransportationId = control.value;
    const isTaken = this.drivers.some(driver =>
      driver.transportationId === selectedTransportationId &&
      driver.id !== this.editingDriverId
    );

    return isTaken ? { transportationTaken: true } : null;
  }

  // Pagination helpers
  totalPages() {
    return Math.ceil(this.filteredDrivers.length / this.pageSize);
  }
  getTotalPages() {
    return Array(5).fill(0).map((_, i) => i + 1);
  }
}
