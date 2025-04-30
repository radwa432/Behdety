import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Government {
  id: number;
  name: string;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class GovernmentService {
  private apiUrl = 'https://localhost:44334/api/Government';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  createGovernment(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }

  update(formData: FormData): Observable<any> {
    return this.http.put(this.apiUrl, formData);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
