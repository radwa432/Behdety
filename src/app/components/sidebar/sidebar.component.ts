import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { BlogPost, Category } from '../../models/blog-post.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() search: string = '';
  @Input() selectedCategoryId: number | null = null;

  @Output() searchChange = new EventEmitter<string>();
  @Output() categorySelected = new EventEmitter<number | null>();

  categories: Category[] = [];
  lastPosts: BlogPost[] = [];

  constructor(private blogService: BlogService, private router: Router) {}

  ngOnInit() {
    this.blogService.getCategories().subscribe({
      next: res => this.categories = res,
      error: err => console.error('Error loading categories:', err)
    });

    this.blogService.getLastPosts().subscribe({
      next: res => this.lastPosts = res,
      error: err => console.error('Error loading last posts:', err)
    });
  }

  // لما المستخدم يضغط Enter
  onSearchEnter() {
    this.searchChange.emit(this.search);
  }

  onCategorySelect(catId: number | null) {
    this.categorySelected.emit(catId);
  }

  goToPost(postId: number) {
    this.router.navigate(['/post', postId]);
  }
}
