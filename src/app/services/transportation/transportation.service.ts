

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Transportation {
  id: string;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class TransportationService {
  private apiUrl = 'https://localhost:44334/api/transportation';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Transportation[]> {
    return this.http.get<Transportation[]>(this.apiUrl);
  }

  create(transportation: Transportation): Observable<any> {
    return this.http.post(this.apiUrl, transportation, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  update(transportation: Transportation): Observable<any> {
    return this.http.put(this.apiUrl, transportation, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
