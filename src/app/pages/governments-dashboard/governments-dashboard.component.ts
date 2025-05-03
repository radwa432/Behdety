import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GovernmentService } from '../../services/government/government.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

interface Government {
  id: number;
  name: string;
  imageUrl: string;
}

@Component({
  selector: 'app-governments',
  templateUrl: './governments-dashboard.component.html',
  styleUrls: ['./governments-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class GovernmentsComponent implements OnInit {
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  governments: Government[] = [];
  governmentForm: FormGroup;
  editingGovernmentId: number | null = null;
  currentPage: number = 1;
  pageSize: number = 8;
  searchTerm: string = '';

  constructor(
    private governmentService: GovernmentService,
    private fb: FormBuilder
  ) {
    this.governmentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      image: ['']
    });
  }

  ngOnInit(): void {
    this.loadGovernments();
  }

  loadGovernments(): void {
    this.governmentService.getGovernments().subscribe({
      next: (data: any) => {
        this.governments = data.map((gov: any) => ({
          id: gov.id,
          name: gov.name,
          imageUrl: gov.imageUrl
        }));
      },
      error: (err) => console.error('Error loading governments:', err)
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);

      this.governmentForm.patchValue({
        image: this.selectedFile.name
      });
    }
  }

  submitForm(): void {
    if (this.governmentForm.invalid) return;

    if (this.editingGovernmentId) {
      const formData = new FormData();
      formData.append('Id', this.editingGovernmentId.toString());
      formData.append('Name', this.governmentForm.value.name);

      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      } else if (this.imagePreview) {
        formData.append('ImageUrl', this.imagePreview.toString());
      }

      this.governmentService.updateGovernment(formData).subscribe({
        next: () => {
          this.loadGovernments();
          this.resetForm();
        },
        error: (err) => console.error('Error updating government:', err)
      });
    } else {
      if (!this.selectedFile) {
        console.error('Image is required');
        return;
      }

      const formData = new FormData();
      formData.append('Name', this.governmentForm.value.name);
      formData.append('image', this.selectedFile);

      this.governmentService.createGovernment(formData).subscribe({
        next: () => {
          this.loadGovernments();
          this.resetForm();
        },
        error: (err) => {
          console.error('Error creating government:', err);
          if (err.status === 400) {
            console.log('Validation errors:', err.error);
          }
        }
      });
    }
  }

  editGovernment(government: Government): void {
    this.editingGovernmentId = government.id;
    this.governmentForm.patchValue({
      name: government.name
    });
    this.imagePreview = government.imageUrl;
  }

  cancelEdit(): void {
    this.editingGovernmentId = null;
    this.resetForm();
  }

  deleteGovernment(id: number): void {
    if (confirm('Are you sure you want to delete this government?')) {
      this.governmentService.deleteGovernment(id).subscribe({
        next: () => this.loadGovernments(),
        error: (err) => console.error('Error deleting government:', err)
      });
    }
  }

  resetForm(): void {
    this.governmentForm.reset();
    this.selectedFile = null;
    this.imagePreview = null;
    this.editingGovernmentId = null;
  }

  // Pagination methods
  get paginatedGovernments(): Government[] {
    const filtered = this.searchTerm
      ? this.governments.filter(g =>
          g.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          (g.id && g.id.toString().includes(this.searchTerm.toLowerCase()))
        )
      : this.governments;

    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return filtered.slice(start, end);
  }

  totalPages(): number {
    const filtered = this.searchTerm
      ? this.governments.filter(g =>
          g.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          (g.id && g.id.toString().includes(this.searchTerm.toLowerCase()))
        )
      : this.governments;

    return Math.ceil(filtered.length / this.pageSize);
  }

  totalPagesArray(): number[] {
    return Array(this.totalPages()).fill(0).map((_, i) => i + 1);
  }
}
