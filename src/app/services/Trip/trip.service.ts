import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
      catchError(error => {
        console.error('Create error:', error);
        throw error;
      })
    );
  }

  updateTrip(id: string, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}`, formData).pipe(
      catchError(error => {
        console.error('Update error:', error);
        throw error;
      })
    );
  }
getTripById(id: string): Observable<TripGetDto> {
  return this.http.get<TripGetDto>(`${this.apiUrl}/${id}`).pipe(
    catchError(error => {
      console.error('Error fetching trip:', error);
      throw error;
    })
  );
}
  deleteTrip(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}