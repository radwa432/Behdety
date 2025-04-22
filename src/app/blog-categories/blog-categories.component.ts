import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Category } from '../models/blog-post.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BlogService } from '../services/blog.service';
import { ContactComponent } from "../shared/contact/contact.component";

@Component({
  selector: 'app-blog-categories',
  imports: [CommonModule, FormsModule, ContactComponent],
  templateUrl: './blog-categories.component.html',
  styleUrls: ['./blog-categories.component.css']
})
export class BlogCategoriesComponent implements OnInit {
  categories: Category[] = [];
  selectedCategoryId: number | null = null;

  @Output() categorySelected = new EventEmitter<number | null>();

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.blogService.getCategories().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error('Error loading categories:', err)
    });
  }

  selectCategory(id: number | null) {
    this.selectedCategoryId = id;
    this.categorySelected.emit(id);
  }
}
