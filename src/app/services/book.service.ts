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
  private tripsUrl = 'https://localhost:44334/api/Trip';

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
  
  updateBook(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  
  deleteBook(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getTrips(page: number): Observable<any> {
    const pageSize = 10; // أو أي عدد من الرحلات الذي ترغب في جلبه في الصفحة الواحدة
    return this.http.get<any[]>(`${this.tripsUrl}?pagenumber=${page}`); // تأكد من إرسال `pagenumber` بشكل صحيح
  }
}
