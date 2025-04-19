import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BlogService } from '../../services/blog.service';
import { Author, BlogPost } from '../../models/blog-post.model';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "../../shared/header/header.component";

@Component({
  selector: 'app-author-posts',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, HeaderComponent],
  templateUrl: './author-posts.component.html',
  styleUrls: ['./author-posts.component.css']
})
export class AuthorPostsComponent implements OnInit {
  posts: BlogPost[] = [];
  authorId!: number;
  author?: Author;


  constructor(private route: ActivatedRoute, private blogService: BlogService) {}

  ngOnInit(): void {
    this.authorId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadAuthorData();
    this.loadAuthorPosts();
  }

  loadAuthorPosts() {
    this.blogService.getPostsByAuthor(this.authorId).subscribe({
      next: (res) => this.posts = res,
      error: (err) => console.error('Error loading author posts', err)
    });
  }


  loadAuthorData() {
    this.blogService.getAuthorById(this.authorId).subscribe({
      next: (res) => this.author = res,
      error: (err) => console.error('Error loading author data', err)
    });

  }


}
