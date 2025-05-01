import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Site } from './site-2.service';
import { Observable } from 'rxjs';
import { Government } from '../interface/government';

@Injectable({
  providedIn: 'root'
})
export class GovernmentService {
    private apiUrl = 'https://localhost:44334/api/government';

  constructor(private http: HttpClient) {

  }
  getGovernments(): Observable<Government[]> {
    return this.http.get<Government[]>(this.apiUrl);
  }
}
