import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Government } from '../../interface/government';


@Injectable({
  providedIn: 'root'
})
export class GovernmentService {
  private apiUrl = 'https://localhost:44334/api/Government';

  constructor(private http: HttpClient) {}

  // Renamed from getAll() to getGovernments() for clarity
  getGovernments(): Observable<Government[]> {
    return this.http.get<Government[]>(this.apiUrl);
  }

  createGovernment(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }

  updateGovernment(formData: FormData): Observable<any> {
    return this.http.put(this.apiUrl, formData);
  }

  deleteGovernment(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}