import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth-service.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = false;
  errorMessage: string | null = null;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  ngOnInit() {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        if (role === 'Admin') {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/home']);
        }
      } catch (error) {
        localStorage.removeItem('access_token');
      }
    }
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = null;

    const credentials = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        this.isLoading = false;
        localStorage.setItem('access_token', response.token);

        try {
          const decoded: any = jwtDecode(response.token);
          const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

          if (role === 'Admin') {
            this.router.navigate(['/admin-main/home']);
          } else {
            this.router.navigate(['/home']);
          }
        } catch (error) {
          this.errorMessage = 'Invalid token received.';
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Login failed. Please check your credentials.';
      }
    });
  }
} 