
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SiteImage {
  id: string;
  siteId: string;
  image: string;
}

export interface Site {
  id: string;
  name: string;
  description: string;
  siteImages: SiteImage[];
}

@Injectable({
  providedIn: 'root'
})
export class SiteService {
  private apiUrl = 'https://localhost:44334/api/Site';

  constructor(private http: HttpClient) {}

  getSites(pageNumber: number = 1): Observable<Site[]> {
    return this.http.get<Site[]>(`${this.apiUrl}?pagenumber=${pageNumber}`);
  }
}
