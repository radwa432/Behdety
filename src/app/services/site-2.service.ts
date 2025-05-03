// site.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Site } from '../models/site';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SiteService {
  private apiUrl = `${environment.apiUrl}/api/Site`;

  constructor(private http: HttpClient) { }

  getSites(pageNumber: number): Observable<Site[]> {
    return this.http.get<Site[]>(`${this.apiUrl}?pagenumber=${pageNumber}`)
      .pipe(catchError(this.handleError));
  }

  getSiteById(id: string): Observable<Site> {
    return this.http.get<Site>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  createSite(site: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}`, site)
      .pipe(catchError(this.handleError));
  }

  updateSite(formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}`, formData);
}

  deleteSite(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
