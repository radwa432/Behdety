import { Component, OnInit } from '@angular/core';

import { BlogService } from '../../services/blog.service';
import { Category, Author, BlogPost } from '../../models/blog-post.model';
import { ActivatedRoute, Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { AdminSidebarComponent } from "../../admin-sidebar/admin-sidebar.component";

@Component({
  selector: 'app-viewpost-dashboard',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './viewpost-dashboard.component.html',
  styleUrl: './viewpost-dashboard.component.css'
})


export class ViewpostDashboardComponent implements OnInit {
  post!: BlogPost;
  isLoading = true;

  blogPosts: BlogPost[] = [];
  categories: Category[] = [];
  lastPosts: BlogPost[] = [];

  search: string = '';
  selectedCategoryId: number | null = null;
  postUrl: string = '';
  shareTitle: string = '';
  showCopySuccess: boolean = false;
  shareOptions = {
    facebook: true,
    twitter: true,
    pinterest: true,
 
  };

  
  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPost();
    this.loadCategories();
    this.loadLastPosts();
    
    this.generateShareLinks();
  }


  generateShareLinks() {
    if (this.post) {
      this.postUrl = encodeURIComponent(window.location.href);
      this.shareTitle = encodeURIComponent(this.post.title);
    }
  }

  shareOnFacebook() {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${this.postUrl}`;
    this.openSharePopup(url);
  }

  shareOnTwitter() {
    const url = `https://twitter.com/intent/tweet?url=${this.postUrl}&text=${this.shareTitle}`;
    this.openSharePopup(url);
  }

  shareOnPinterest() {
    const media = this.post.imageUrl ? encodeURIComponent(this.post.imageUrl) : '';
    const url = `https://pinterest.com/pin/create/button/?url=${this.postUrl}&media=${media}&description=${this.shareTitle}`;
    this.openSharePopup(url);
  }
  copyToClipboard() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      this.showCopySuccess = true;
      setTimeout(() => this.showCopySuccess = false, 3000);
    });
  }

  private openSharePopup(url: string) {
    window.open(url, '_blank', 'width=600,height=400');
  }


  trackShareEvent(platform: string) {
    
    console.log(`Shared on ${platform}`);}
    



//////////
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

  
///estimated time to read
calculateReadingTime() {
  const words = this.post.content.split(/\s+/).length;
  return Math.ceil(words / 200); }
  


  goToPost( postId: number) {
    if (postId) {
      this.blogService.getPostById(postId).subscribe({
        next: (res) => {
          this.post = res;
          this.router.navigate(['/post', postId]);
        }
       
      });
   
  }
}


}
