
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../../services/blog.service';
import { Category, Author, BlogPost } from '../../models/blog-post.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-create-post',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css'],
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
})
export class CreatePostComponent implements OnInit {
  postForm!: FormGroup;
  categories: Category[] = [];
  authors: Author[] = [];
  isEditMode: boolean = false;
  postId!: number;
  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadCategories();
    this.loadAuthors();
  }

  initForm() {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      imageUrl: ['', Validators.required],
      blogCategoryId: [null, Validators.required],
      authorId: [null, Validators.required]
    });

    
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.postId = +id;
        this.loadPost(this.postId);
      }
    });
  }
  loadPost(id: number) {
    this.blogService.getPostById(id).subscribe((post: BlogPost) => {
      this.postForm.patchValue({
        title: post.title,
        content: post.content,
        imageUrl: post.imageUrl,
        blogCategoryId: post.blogCategoryId,
        authorId: post.authorId
      });
    });
  }


  loadCategories() {
    this.blogService.getCategories().subscribe(res => {
      this.categories = res;
    });
  }

  loadAuthors() {
    this.blogService.getAuthors().subscribe(res => {
      this.authors = res;
    });
  }

  onSubmit() {
    if (this.postForm.valid) {
      const formData = {
        ...this.postForm.value,
        createdAt: new Date().toISOString(),
        authorName: '',
        blogCategoryName: ''
      };

      if (this.isEditMode) {
        this.blogService.updatePost(this.postId, formData).subscribe(() => {
          this.router.navigate(['/dashboard']);
        });
      } else {
        this.blogService.createPost(formData).subscribe(() => {
          this.router.navigate(['/dashboard']);
        });
      }
    }
  }
}
