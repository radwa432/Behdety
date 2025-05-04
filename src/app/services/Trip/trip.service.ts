import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TripGetDto } from '../../models/trip.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private apiUrl = `${environment.apiUrl}/api/Trip`;

  constructor(private http: HttpClient) { }

  getTrips(pageNumber: number): Observable<TripGetDto[]> {
    return this.http.get<TripGetDto[]>(`${this.apiUrl}?pagenumber=${pageNumber}`);
  }

  createTrip(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData).pipe(
      catchError(this.handleError)
    );
  }

  updateTrip(formData: FormData): Observable<any> {
    return this.http.put(this.apiUrl, formData).pipe(  // No ID in URL
      catchError(this.handleError)
    );
  }

  getTripById(id: string): Observable<TripGetDto> {
    return this.http.get<TripGetDto>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  deleteTrip(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private getAuthToken(): string {
    // Replace with the actual logic to retrieve the auth token
    return localStorage.getItem('authToken') || '';
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server Error (${error.status}): `;
      if (error.error) {
        try {
          const serverError = typeof error.error === 'string' 
            ? JSON.parse(error.error) 
            : error.error;
          errorMessage += serverError.message || error.message;
        } catch (e) {
          errorMessage += error.message;
        }
      }
    }
    console.error('Full error:', error);
    return throwError(() => new Error(errorMessage));
  }
}