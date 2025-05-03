import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Government } from '../interface/government';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GovernmentService {
    private apiUrl = `${environment.apiUrl}/api/government`;

  constructor(private http: HttpClient) {

  }
  getGovernments(): Observable<Government[]> {
    return this.http.get<Government[]>(this.apiUrl);
  }
}
