
import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { BlogPost } from '../../models/blog-post.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import{FormsModule} from '@angular/forms'
import { Category } from '../../models/blog-post.model';
import { debounceTime, Subject } from 'rxjs';
import { TruncatePipe } from "../../pipe/truncate.pipe";

@Component({
  selector: 'app-dashboard',
  templateUrl: './postdashboard.component.html',
  imports: [CommonModule, RouterModule, FormsModule, TruncatePipe],
  styleUrls: ['./postdashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  posts: BlogPost[] = [];
  pageNumber = 1;
  pageSize = 8;
  totalPages = 0;
  totalCount = 0;
  searchText = '';
  private searchSubject = new Subject<string>();
  categories: Category[] = [];
  selectedCategoryId: number | null = null;

  constructor(private blogService: BlogService, private router: Router) {}

  ngOnInit(): void {
    this.loadPosts();
    this.blogService.getCategories().subscribe(cats => {
      this.categories = cats;
    });
    this.searchSubject.pipe(debounceTime(500)).subscribe(search => {
      this.pageNumber = 1; 
      this.loadPosts();
     
    });
  }

  loadPosts(): void {
    this.blogService.getPosts(this.pageNumber, this.pageSize, this.searchText, this.selectedCategoryId!).subscribe(response => {
      this.posts = response.data;
      this.totalCount = response.totalCount;
      this.totalPages = Math.ceil(this.totalCount / this.pageSize);
    });
  }
  onSearchChange(): void {
    this.searchSubject.next(this.searchText);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.pageNumber = page;
      this.loadPosts();
    }
  }

 

  deletePost(id: number) {
    if (confirm('Are you sure you want to delete this post?')) {
      this.blogService.deletePost(id).subscribe({
        next: () => this.loadPosts(),
        error: (err) => console.error('Error deleting post', err)
      });
    }
  }

  viewPost(id: number) {
    this.router.navigate(['dashboard/viewpost', id]);
  }
  editPost(id: number) {
    this.router.navigate(['edit-post', id]);
  }

  createPost() {
    this.router.navigate(['dashboard/posts/create']);
  }
}
