import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf , NgFor, CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-add-site',
  imports: [ReactiveFormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './admin-add-site.component.html',
  styleUrl: './admin-add-site.component.css',
 
})
export class AdminAddSiteComponent implements OnInit {
  siteForm!: FormGroup;
  governments: any[] = [];
  selectedImages: File[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient,private toastr: ToastrService) {}

  ngOnInit(): void {
    this.siteForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[A-Za-z]+(?: [A-Za-z]+)*$/)
      ]],
      description: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[a-zA-Z][a-zA-Z\s]{2,200}[0-9]*$/)
      ]],
      governmentId: ['', Validators.required],
      images: [null, Validators.required]
    });

    this.loadGovernments();
  }

  loadGovernments() {
    this.http.get<any[]>('https://localhost:7028/api/government')
      .subscribe({
        next: data => this.governments = data,
        error: err => console.error('Failed to load governments', err)
      });
  }

  onFileChange(event: any) {
    const files = event.target.files as FileList;
    this.selectedImages = Array.from(files);
    this.siteForm.patchValue({ images: this.selectedImages });
  }

  onSubmit() {
    if (this.siteForm.invalid) return;

    const formData = new FormData();
    formData.append('Name', this.siteForm.get('name')?.value);
    formData.append('Description', this.siteForm.get('description')?.value);
    formData.append('GovernmentId', this.siteForm.get('governmentId')?.value);
    this.selectedImages.forEach(file => formData.append('images', file));

    this.http.post('https://localhost:7028/api/site', formData).subscribe({
      next:  res => {
        this.toastr.success('Site created successfully!', 'Success');
        console.log(res);
      },
      error: err => {
        this.toastr.error('Something went wrong!', 'Error');
        console.error(err);
      }
    });
  }

  get f() {
    return this.siteForm.controls;
  }
}
