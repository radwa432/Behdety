import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { BlogPost, Category } from '../../models/blog-post.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../shared/header/header.component";

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HeaderComponent],
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  post!: BlogPost;
  isLoading = true;

  blogPosts: BlogPost[] = [];
  categories: Category[] = [];
  lastPosts: BlogPost[] = [];

  search: string = '';
  selectedCategoryId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPost();
    this.loadCategories();
    this.loadLastPosts();
    this.loadPosts();
  }

  loadPost() {
    const postId = Number(this.route.snapshot.paramMap.get('id'));
    if (postId) {
      this.blogService.getPostById(postId).subscribe({
        next: (res) => {
          this.post = res;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading post:', err);
          this.isLoading = false;
        }
      });
    }
  }

  loadPosts() {
    this.blogService
      .getPosts(1, 5, this.search, this.selectedCategoryId ?? undefined)
      .subscribe({
        next: (res) => {
          this.blogPosts = res.data;
        },
        error: (err) => console.error('Error loading posts:', err)
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
    this.router.navigate(['/blogs'], { queryParams: { search: this.search } });
  }
  

  onCategorySelect(categoryId: number | null) {
    const queryParams: any = {};
    if (categoryId !== null) {
      queryParams.categoryId = categoryId;
    }
    this.router.navigate(['/blogs'], { queryParams:{selectedCategoryId:this.selectedCategoryId} });
  }


  goToPost(postId: number) {
    this.router.navigate(['/post', postId], { queryParams: {LastPosts: this.lastPosts } });
  }
}
