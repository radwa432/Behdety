// src/app/services/dashboard.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DashboardHomeService {
  private baseUrl = `${environment.apiUrl}/api/dashboard`; 

  constructor(private http: HttpClient) {}

  getStats() {
    return this.http.get(`${this.baseUrl}/stats`);
  }

  getRecentBookings() {
    return this.http.get(`${this.baseUrl}/recent`);
  }
}



