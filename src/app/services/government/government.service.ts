import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Government } from '../../interface/government';

@Injectable({
  providedIn: 'root'
})
export class GovernmentService {
  private apiUrl = 'https://localhost:44334/api/Government';

  constructor(private http: HttpClient) {}

  getGovernments(): Observable<Government[]> {
    return this.http.get<Government[]>(this.apiUrl).pipe(
      map((governments: Government[]) => governments),
      catchError(error => {
        console.error('Error loading governments:', error);
        return [];
      })
    );
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