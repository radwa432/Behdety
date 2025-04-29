// src/app/dashboard/transportations/transportations.component.ts

import { Component, OnInit } from '@angular/core';
import { TransportationService, Transportation } from '../../services/transportation/transportation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-transportations',
  templateUrl: './transportations-dashboard.component.html',
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,

],  
  styleUrls: ['./transportations-dashboard.component.css'],
})
export class TransportationsComponent implements OnInit {
  transportations: Transportation[] = [];
  transportationForm!: FormGroup;
  editingTransportationId: string | null = null;
  currentPage: number = 1; 
  pageSize: number = 8; 
  searchTerm: string = '';
  constructor(
    private transportationService: TransportationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadTransportations();
    this.initForm();
  }

  initForm() {
    this.transportationForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required]
    });
  }

  loadTransportations() {
    this.transportationService.getAll().subscribe(data => {
      this.transportations = data;
    });
  }

  submitForm() {
    if (this.transportationForm.invalid) return;

    const transportation: Transportation = {
      id:  this.transportationForm.value.id, 
      name: this.transportationForm.value.name
    };

    if (this.editingTransportationId) {
      this.transportationService.update(transportation).subscribe(() => {
        this.loadTransportations();
        this.cancelEdit();
      });
    } else {
      this.transportationService.create(transportation).subscribe(() => {
        this.loadTransportations();
        this.transportationForm.reset();
      });
    }
  }

  editTransportation(transportation: Transportation) {
    this.editingTransportationId = transportation.id;
    this.transportationForm.patchValue({
      id: transportation.id, 
      name: transportation.name
    });
  }

  cancelEdit() {
    this.editingTransportationId = null;
    this.transportationForm.reset();
  }

  deleteTransportation(id: string) {
    if (confirm(' are you sure you want to delete this transportation?')) {
      this.transportationService.delete(id).subscribe(() => {
        this.loadTransportations();
      });
    }
  }
  // Pagination logic
  get paginatedTransportations() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.transportations.slice(start, end);
  }

  totalPages() {
    return Math.ceil(this.transportations.length / this.pageSize);
  }
  
  totalPagesArray() {
    return Array(this.totalPages()).fill(0).map((_, i) => i + 1);
  }
//////////////////////////
 


}
