// book.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Book, BookingResponse } from '../models/book';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = `${environment.apiUrl}/api/Books`;

  constructor(private http: HttpClient) { }

  createBooking(bookingData: any): Observable<BookingResponse> {
    return this.http.post<BookingResponse>(this.apiUrl, bookingData);
  }
  getBooking(bookingId: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${bookingId}`);
  }


  getAllBookings(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }
  
  
}
