import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { BlogPost  } from '../../models/blog-post.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "../../shared/header/header.component";
import { ContactComponent } from "../../shared/contact/contact.component";

@Component({
  selector: 'app-category-posts',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, ContactComponent],
  templateUrl: './category-posts.component.html',
  styleUrls: ['./category-posts.component.css']
})
export class CategoryPostsComponent implements OnInit {
  posts: BlogPost[] = [];
  categoryId!: number;
  categoryName = '';

  constructor(private route: ActivatedRoute, private blogService: BlogService) {}

  ngOnInit(): void {
    this.categoryId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadCategoryPosts();
  }

  loadCategoryPosts() {
    this.blogService.getPostsByCategory(this.categoryId).subscribe({
      next: (res) => {
        this.posts = res;
        if (res.length > 0) this.categoryName = res[0].blogCategoryName || '';
      },
      error: (err) => console.error('Error loading category posts', err)
    });
  }
}
