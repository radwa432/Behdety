import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BlogService } from '../../services/blog.service';
import { Author, BlogPost } from '../../models/blog-post.model';
import { FormsModule } from '@angular/forms'; 
import { RouterModule } from '@angular/router';
import { TruncatePipe } from '../../pipe/truncate.pipe';

@Component({
  selector: 'app-authorposts',
  imports: [CommonModule, FormsModule, RouterModule, TruncatePipe], 
  templateUrl: './authorposts.component.html',
  styleUrl: './authorposts.component.css'
})



export class AuthorpostdahboardComponent implements OnInit {
  posts: BlogPost[] = [];
  filteredPosts: BlogPost[] = [];
  authorId!: number;
  author?: Author;
  searchQuery: string = '';
  isLoading: boolean = false;

  constructor(private route: ActivatedRoute, private blogService: BlogService) {}

  ngOnInit(): void {
    this.authorId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadAuthorData();
    this.loadAuthorPosts();
  }

  loadAuthorPosts() {
    this.isLoading = true;
    this.blogService.getPostsByAuthor(this.authorId).subscribe({
      next: (res) => {
        this.posts = res;
        this.filteredPosts = [...res]; 
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading author posts', err);
        this.isLoading = false;
      }
    });
  }

  loadAuthorData() {
    this.blogService.getAuthorById(this.authorId).subscribe({
      next: (res) => this.author = res,
      error: (err) => console.error('Error loading author data', err)
    });
  }

  // دالة البحث
  searchPosts() {
    if (!this.searchQuery.trim()) {
      this.filteredPosts = [...this.posts]; 
      return;
    }

    const query = this.searchQuery.toLowerCase();
    this.filteredPosts = this.posts.filter(post => 
      post.title.toLowerCase().includes(query) || 
      post.content.toLowerCase().includes(query) ||
      (post.blogCategoryName && post.blogCategoryName.toLowerCase().includes(query))
    );
  }

 
  hasSearchResults(): boolean {
    return this.searchQuery.trim() !== '' && this.filteredPosts.length === 0;
  }
}




