import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray , FormControl} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-admin-add-trip',
  imports: [ CommonModule,ReactiveFormsModule],
  templateUrl: './admin-add-trip.component.html',
  styleUrl: './admin-add-trip.component.css'
})
export class AdminAddTripComponent {

  tripForm!: FormGroup;
  sitesList: any[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient,private toastr: ToastrService) {}

  ngOnInit() {
    this.tripForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-z]+(?: [A-Za-z]+)*$/)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z][a-zA-Z\s]{2,200}[0-9]*$/)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      money: ['', Validators.required],
      maxPeople: ['', [Validators.required, Validators.min(0), Validators.max(10000)]],
      includedItems: this.fb.array([this.fb.control('', Validators.required)]),
      excludedItems: this.fb.array([this.fb.control('', Validators.required)]),
      sites: [[], Validators.required],
    });

    this.loadSites();
  }

  get includedItems(): FormArray<FormControl> {
    return this.tripForm.get('includedItems') as FormArray<FormControl>;
  }

  get excludedItems(): FormArray<FormControl> {
    return this.tripForm.get('excludedItems') as FormArray<FormControl>;
  }

  addIncludedItem() {
    this.includedItems.push(this.fb.control('', Validators.required));
  }

  addExcludedItem() {
    this.excludedItems.push(this.fb.control('', Validators.required));
  }

  removeIncludedItem(index: number) {
    this.includedItems.removeAt(index);
  }

  removeExcludedItem(index: number) {
    this.excludedItems.removeAt(index);
  }

  loadSites() {
    this.http.get<any[]>('/api/site/foradd') // update with your actual endpoint
      .subscribe(data => {
        this.sitesList = data;
      });
  }

  onSubmit() {
    if (this.tripForm.valid) {
      console.log('Form Submitted:', this.tripForm.value);
      const tripData = this.tripForm.value;
      this.http.post('https://localhost:7028/api/trip', tripData).subscribe({
        next:  res => {
          this.toastr.success('trip created successfully!', 'Success');
          console.log(res);
        },
        error: err => {
          this.toastr.error('Something went wrong!', 'Error');
          console.error(err);
        }
      });
    } else {
      this.tripForm.markAllAsTouched();
    }
  }

}
