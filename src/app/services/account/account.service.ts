import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
export class AccountService {

  private apiUrl = 'https://localhost:44334/api/Account';

  constructor(private http: HttpClient) { }

  getAccount(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/account`);
  }
  

}
