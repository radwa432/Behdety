// src/app/services/book.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Book, BookCreateDto } from '../models/book';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BookService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/books`;

  createBook(book: BookCreateDto): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book);
  }

  calculateAmount(days: number, people: number): number {
    // Your pricing calculation logic
    return days * people * 100; // Example calculation
  }
}
