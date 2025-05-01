// trip.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { TripGetDto, TripCreateDto, TripUpdateDto } from '../../models/trip.model';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private apiUrl = 'https://localhost:44334/api/Trip';

  constructor(private http: HttpClient) { }

  getTrips(pageNumber: number): Observable<TripGetDto[]> {
    return this.http.get<TripGetDto[]>(`${this.apiUrl}?pagenumber=${pageNumber}`)
      .pipe(catchError(this.handleError));
  }

  getTripById(id: string): Observable<TripGetDto> {
    return this.http.get<TripGetDto>(`${this.apiUrl}/single/${id}`)
      .pipe(catchError(this.handleError));
  }

  createTrip(trip: TripCreateDto): Observable<any> {
    return this.http.post(`${this.apiUrl}`, trip)
      .pipe(catchError(this.handleError));
  }

  updateTrip(trip: TripUpdateDto): Observable<any> {
    return this.http.put(`${this.apiUrl}`, trip)
      .pipe(catchError(this.handleError));
  }

  deleteTrip(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
