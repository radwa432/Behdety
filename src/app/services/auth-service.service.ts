// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  password: string;
}
interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterResponse {

  success: boolean;
  message?: string;
}
interface LoginResponse {
  token: string;

}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/api/Account`;

  constructor(private http: HttpClient) { }

  register(userData: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/register`, userData);
  }
  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials);
  }

}
