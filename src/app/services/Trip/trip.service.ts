import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
interface Trip {
  tripId: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  duration: number;
  money: number;
  availablePeople: number;
  maxPeople: number;
  isDeleted: boolean;
  outOfDate: boolean;
  includedItems: string[];
  excludedItems: string[];
  sites: number[];
}


@Injectable({ providedIn: 'root' })
export class TripService {
  private apiUrl = 'https://localhost:44334/api/Trip';

  constructor(private http: HttpClient) {}

  // Get trips with only page number parameterrrr
  getTrips(pageNumber = 1): Observable<Trip[]> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString());

    return this.http.get<Trip[]>(this.apiUrl, { params });

  }

  // Get single trip by ID
  getTripById(id: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.apiUrl}/${id}`);
  }

  // Create new trip
  createTrip(trip: Omit<Trip, 'tripId'> & { tripId?: string }): Observable<Trip> {
    // Ensure proper data structure
    const requestBody = {
      name: trip.name,
      description: trip.description,
      startDate: trip.startDate,
      endDate: trip.endDate,
      duration: trip.duration,
      money: trip.money,
      availablePeople: trip.availablePeople,
      maxPeople: trip.maxPeople,
      includedItems: trip.includedItems,
      excludedItems: trip.excludedItems,
      sites: trip.sites,
      isDeleted: trip.isDeleted,
      outOfDate: trip.outOfDate,
      tripId: trip.tripId // Send as tripId not tripIdId
    };

    return this.http.post<Trip>(this.apiUrl, requestBody, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Update existing trip
  updateTrip(trip: Trip): Observable<Trip> {
    return this.http.put<Trip>(`${this.apiUrl}`, trip, { // Note: URL might need to include ID
      headers: { 'Content-Type': 'application/json' }
    });
  }

  deleteTrip(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Search trips (optional)
  searchTrips(searchTerm: string, pageNumber = 1): Observable<Trip[]> {
    const params = new HttpParams()
      .set('search', searchTerm)
      .set('pageNumber', pageNumber.toString());

    return this.http.get<Trip[]>(`${this.apiUrl}/search`, { params });
  }

  // Get trips by site (optional)
  getTripsBySite(siteId: number, pageNumber = 1): Observable<Trip[]> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString());

    return this.http.get<Trip[]>(`${this.apiUrl}/site/${siteId}`, { params });
  }
}
