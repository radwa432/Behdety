import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Category } from '../../models/blog-post.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-category-dashboard',
  templateUrl: './category-dashboard.component.html',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  styleUrls: ['./category-dashboard.component.css'],
})
export class CategoryDashboardComponent implements OnInit {
  categories: Category[] = [];
  filteredCategories: Category[] = [];
  searchTerm: string = '';

  currentPage = 1;
  pageSize = 5;

  categoryForm!: FormGroup;
  editingCategory: Category | null = null;

  constructor(private blogService: BlogService, private fb: FormBuilder) {}

  ngOnInit() {
    this.loadCategories();
    this.initForm();
  }

  initForm() {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  loadCategories() {
    this.blogService.getCategories().subscribe((data) => {
      this.categories = data;
      this.applyFilter();
    });
  }

  saveCategory() {
    if (this.categoryForm.invalid) return;

    const categoryData = this.categoryForm.value;

    if (this.editingCategory) {
      this.blogService.updateCategory(this.editingCategory.id!, categoryData).subscribe(() => {
        this.editingCategory = null;
        this.categoryForm.reset();
        this.loadCategories();
      });
    } else {
      this.blogService.createCategory(categoryData).subscribe(() => {
        this.categoryForm.reset();
        this.loadCategories();
      });
    }
  }

  editCategory(category: Category) {
    this.editingCategory = category;
    this.categoryForm.patchValue({ name: category.name });
  }

  deleteCategory(id: number) {
    if (confirm('هل أنت متأكد من حذف التصنيف؟')) {
      this.blogService.deleteCategory(id).subscribe(() => {
        this.loadCategories();
      });
    }
  }

  cancelEdit() {
    this.editingCategory = null;
    this.categoryForm.reset();
  }

  applyFilter() {
    if (this.searchTerm.trim()) {
      this.filteredCategories = this.categories.filter(cat =>
        cat.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredCategories = [...this.categories];
    }
    this.currentPage = 1;
  }

  get paginatedCategories() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredCategories.slice(start, start + this.pageSize);
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

  get totalPages() {
    return Math.ceil(this.filteredCategories.length / this.pageSize);
  }
}
