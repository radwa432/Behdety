import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookDetailDto, CreateBookDto } from '../../models/book';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = `${environment.apiUrl}/api/Books`;
  private tripsUrl = 'https://localhost:44334/api/Trip';
  constructor(private http: HttpClient) {}

  getBookings(): Observable<BookDetailDto[]> {
    return this.http.get<BookDetailDto[]>(this.apiUrl);
  }

  getBooking(id: string): Observable<BookDetailDto> {
    return this.http.get<BookDetailDto>(`${this.apiUrl}/${id}`);
  }

  createBooking(dto: CreateBookDto): Observable<BookDetailDto> {
    return this.http.post<BookDetailDto>(this.apiUrl, dto);
  }

  updateBooking(id: string, dto: CreateBookDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, dto);
  }

  deleteBooking(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getTrips(page: number): Observable<any> {
    const pageSize = 10; 
    return this.http.get<any[]>(`${this.tripsUrl}?pagenumber=${page}`); 
  }
}
