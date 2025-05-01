// site-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Site, SiteImage } from '../../models/site';
import { SiteService } from '../../services/site-2.service';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from "../../pipe/truncate.pipe";
import { GovernmentService } from '../../services/government/government.service';



@Component({
  selector: 'app-site-dashboard',
  templateUrl: './site-dashboard.component.html',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TruncatePipe],
  styleUrls: ['./site-dashboard.component.css']
})
export class SiteDashboardComponent implements OnInit {
  sites: Site[] = [];
  filteredSites: Site[] = [];
  paginatedSites: Site[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  searchTerm = '';
  editingSiteId: string | null = null;
  errorMessage = '';
  selectedFiles: File[] = [];
  previewImages: string[] = [];
  governments: any[] = [];

  siteForm: FormGroup;

  constructor(
    private siteService: SiteService,
    private governmentService: GovernmentService,
    private fb: FormBuilder
  ) {
    this.siteForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      governmentId: ['', Validators.required],
      images: ['']
    });
  }

  ngOnInit(): void {
    this.loadSites();
    this.loadGovernments(); // Load governments here - you'll need to implement this
    // Load governments here - you'll need to implement this
    // this.loadGovernments();
  }
  loadGovernments(): void {
    this.governmentService.getAll().subscribe({
      next: (governments: any[]) => {
        this.governments = governments;
      },
      error: (err) => {
        this.showError('Failed to load governments: ' + err.message);
      }
    });
  }

  loadSites(): void {
    this.siteService.getSites(this.currentPage).subscribe({
      next: (sites) => {
        this.sites = sites;
        this.filteredSites = [...sites];
        this.updatePaginatedSites();
      },
      error: (err) => {
        this.showError('Failed to load sites: ' + err.message);
      }
    });
  }

  onFileSelected(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
    this.previewImages = [];
    this.selectedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImages.push(e.target.result);
      };
      reader.readAsDataURL(file);
    });
  }

  removeImage(index: number): void {
    this.previewImages.splice(index, 1);
    this.selectedFiles.splice(index, 1);
  }

 // In site-dashboard.component.ts
removeExistingImage(imageUrl: string, index: number): void {
  if (!this.siteForm.get('removedImages')?.value) {
    this.siteForm.addControl('removedImages', this.fb.array([]));
  }
  const removedImages = this.siteForm.get('removedImages')?.value;
  removedImages.push(imageUrl);
  this.siteForm.get('removedImages')?.setValue(removedImages);

  // Remove from preview
  this.previewImages.splice(index, 1);
}

submitForm(): void {
  if (this.siteForm.invalid) return;

  const formData = new FormData();
  const formValue = this.siteForm.value;

  // Append all non-file data
  formData.append('Id', this.editingSiteId || '');
  formData.append('Name', formValue.name);
  formData.append('Description', formValue.description);
  formData.append('GovernmentId', formValue.governmentId.toString());

  // Handle existing images (if editing)
  if (this.editingSiteId && this.previewImages.length) {
      const existingImages = this.previewImages
          .filter(img => typeof img !== 'string' || !img.startsWith('blob:'))
          .map(img => ({ image: img }));
      formData.append('SiteImages', JSON.stringify(existingImages));
  }

  // Append new files
  this.selectedFiles.forEach(file => {
      formData.append('Images', file, file.name);
  });

  // Debug what's being sent
  console.log('FormData contents:');
  formData.forEach((value, key) => {
      console.log(key, value);
  });

  const serviceCall = this.editingSiteId
      ? this.siteService.updateSite(formData)
      : this.siteService.createSite(formData);

  serviceCall.subscribe({
      next: () => {
          this.loadSites();
          this.resetForm();
      },
      error: (err) => {
          console.error('Detailed error:', err);
          this.showError(`Failed to ${this.editingSiteId ? 'update' : 'create'} site: ${err.message}`);
      }
  });
}

  editSite(site: Site): void {
    this.editingSiteId = site.id;
    this.siteForm.patchValue({
      name: site.name,
      description: site.description,
      governmentId: site.governmentId
    });
    this.previewImages = site.siteImages.map(img => img.image);
  }

  deleteSite(id: string): void {
    if (confirm('Are you sure you want to delete this site?')) {
      this.siteService.deleteSite(id).subscribe({
        next: () => {
          this.loadSites();
        },
        error: (err) => {
          this.showError('Failed to delete site: ' + err.message);
        }
      });
    }
  }

  cancelEdit(): void {
    this.editingSiteId = null;
    this.resetForm();
  }

  onSearch(): void {
    if (!this.searchTerm) {
      this.filteredSites = [...this.sites];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredSites = this.sites.filter(site =>
        site.name.toLowerCase().includes(term) ||
        site.description?.toLowerCase().includes(term)
      );
    }
    this.currentPage = 1;
    this.updatePaginatedSites();
  }

  updatePaginatedSites(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedSites = this.filteredSites.slice(startIndex, startIndex + this.itemsPerPage);
  }

  totalPages(): number {
    return Math.ceil(this.filteredSites.length / this.itemsPerPage);
  }

  totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
  }

  private resetForm(): void {
    this.siteForm.reset({
      name: '',
      description: '',
      governmentId: '',
      images: ''
    });
    this.editingSiteId = null;
    this.selectedFiles = [];
    this.previewImages = [];
    if (this.siteForm.get('existingImages')) {
      this.siteForm.removeControl('existingImages');
    }
  }

  private showError(message: string): void {
    this.errorMessage = message;
    console.error(message);
    setTimeout(() => this.errorMessage = '', 5000);
  }
}
