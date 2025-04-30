import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Author } from '../../models/blog-post.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-author-dashboard',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './author-dashboard.component.html',
  styleUrl: './author-dashboard.component.css'
})
export class AuthorDashboardComponent implements OnInit {

  authors: Author[] = [];
  filteredAuthors: Author[] = [];
  searchTerm: string = '';
  currentPage = 1;
  pageSize = 5;

  AuthorForm!: FormGroup;
  editingAutour: Author | null = null;
  crearesuccess: boolean = false;
  updatesuccess: boolean = false;
  constructor(private blogService: BlogService, private fb: FormBuilder,private router: Router) {}

  ngOnInit() {
    this.loadAuthor();
    this.initForm();
  }

  initForm() {
    this.AuthorForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      bio: ['admin', []],
      img: ['', []],
    
      
    });
  }

  loadAuthor() {
    this.blogService.getAuthors().subscribe((data) => {
      this.authors = data;
      this.applyFilter();
    });
  }

  saveAuthor() {
    if (this.AuthorForm.invalid) return;

    const AuthorData = this.AuthorForm.value;

    if (this.editingAutour) {
      this.blogService.editAuthor(this.editingAutour.id!, AuthorData).subscribe(() => {
        this.editingAutour = null;
        this.AuthorForm.reset();
        this.updatesuccess = true;
        setTimeout(() => this.updatesuccess = false, 3000); 
        this.loadAuthor();
      });
    } else {
      this.blogService.createAuthor(AuthorData).subscribe(() => {
        this.AuthorForm.reset();
        this.crearesuccess = true;
        setTimeout(() => this.crearesuccess = false, 3000);
        this.loadAuthor();
      });
    }
  }

  editAuthor(author: Author) {
    this.editingAutour = author;
    this.AuthorForm.patchValue({ name: author.name, bio: author.bio });
  
  }

  deleteAuthor(id: number) {
    if (confirm(' Are you sure you want to delete this Author?')) {
      this.blogService.deleteAuthor(id).subscribe(() => {
        this.loadAuthor();
      });
    }
  }

  cancelEdit() {
    this.editingAutour = null;
    this.AuthorForm.reset();
  }

  viewAuthor(id: number) {
    this.router.navigate(['dashboard/viewAuthorposts', id]);
  }

   
  applyFilter() {
    if (this.searchTerm.trim()) {
      this.filteredAuthors = this.authors.filter(cat =>
        cat.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredAuthors = [...this.authors];
    }
    this.currentPage = 1;
  }

  get paginatedAuthor() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredAuthors.slice(start, start + this.pageSize);
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

  get totalPages() {
    return Math.ceil(this.filteredAuthors.length / this.pageSize);
  }
}
