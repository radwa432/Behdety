import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BlogService } from '../../services/blog.service';
import { BlogPost, Category } from '../../models/blog-post.model';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "../../shared/header/header.component";


@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HeaderComponent],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css'
})
export class BlogListComponent implements OnInit {
  blogPosts: BlogPost[] = [];
  categories: Category[] = [];
  lastPosts: BlogPost[] = [];

  pageNumber: number = 1;
  pageSize: number = 6;
  totalCount: number = 0;

  search: string = '';
  selectedCategoryId: number | null = null;

  isLoading: boolean = false;

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.loadPosts();
    this.loadCategories();
    this.loadLastPosts();
    
  }

  loadPosts() {
    this.isLoading = true;
    this.blogService
      .getPosts(this.pageNumber, this.pageSize, this.search, this.selectedCategoryId ?? undefined)
      .subscribe({
        next: (res) => {
          this.blogPosts = res.data;
          this.totalCount = res.totalCount;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading posts:', err);
          this.isLoading = false;
        }
      });
  }

  loadCategories() {
    this.blogService.getCategories().subscribe({
      next: (res) => this.categories = res,
      error: (err) => console.error('Error loading categories:', err)
    });
  }

  loadLastPosts() {
    this.blogService.getLastPosts().subscribe({
      next: (res) => this.lastPosts = res,
      error: (err) => console.error('Error loading last posts:', err)
    });
  }

  onSearchChange() {
    this.pageNumber = 1;
    this.loadPosts();
  }

  onCategorySelect(categoryId: number | null) {
    this.selectedCategoryId = categoryId;
    this.pageNumber = 1;
    this.loadPosts();
  }

  goToPage(page: number) {
    this.pageNumber = page;
    this.loadPosts();
  }

  get totalPages(): number[] {
    const totalPagesCount = Math.ceil(this.totalCount / this.pageSize);
    return Array.from({ length: totalPagesCount }, (_, i) => i + 1);
  }


 
}

