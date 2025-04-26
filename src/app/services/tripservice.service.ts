// trip.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private apiUrl = 'https://localhost:44334/api/Trip';

  constructor(private http: HttpClient) { }

  getTripDetails(pageNumber: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?pagenumber=${pageNumber}`);
  }
}
