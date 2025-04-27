// driver.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Driver {
  id: string;
  name: string;
  transportationId: string;
  transportationName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  private apiUrl = 'https://localhost:44334/api/Driver';

  constructor(private http: HttpClient) { }

  getAllDrivers(pageNumber: number): Observable<Driver[]> {
    return this.http.get<Driver[]>(`${this.apiUrl}?pagenumber=${pageNumber}`);
  }

  createDriver(driver: Partial<Driver>): Observable<any> {
    return this.http.post(this.apiUrl, driver);
  }

  updateDriver(driver: Driver): Observable<any> {
    return this.http.put(this.apiUrl, driver);
  }

  deleteDriver(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
