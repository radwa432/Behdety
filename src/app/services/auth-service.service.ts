// auth.service.ts
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtService } from '../service/jwt.service';

interface User {
  email: string;
  firstName: string;
  lastName: string;
}

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

interface ForgotPasswordResponse {
  message: string;
}

interface ResetPasswordDto {
  email: string;
  otp: string;
  newPassword: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private apiUrl = `${environment.apiUrl}/api/Account`;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private jwtService: JwtService) {
    this.initializeUser();
     // Check initial auth state (e.g., from localStorage)
     this.isAuthenticated = !!localStorage.getItem('authToken');
  }

  private initializeUser() {
    const token = localStorage.getItem('token');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decoded = this.jwtHelper.decodeToken(token);
      this.currentUserSubject.next({
        email: decoded.email,
        firstName: decoded.FirstName, // From custom claim
        lastName: decoded.LastName    // From custom claim
      });
    }
  }
  register(userData: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/register`, userData);
  }
  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  login(credentials: LoginRequest): Observable<any> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        const decoded = this.jwtHelper.decodeToken(response.token);
        this.currentUserSubject.next({
          email: decoded.email,
          firstName: decoded.FirstName,
          lastName: decoded.LastName
        });
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }


  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  forgotPassword(email: string): Observable<ForgotPasswordResponse> {
    return this.http.post<ForgotPasswordResponse>(`${this.apiUrl}/forgot-password`, { email });
  }

  resetPassword(email: string, otp: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, { 
      email, 
      OTP: otp, 
      NewPassword: newPassword 
    });
  }
}