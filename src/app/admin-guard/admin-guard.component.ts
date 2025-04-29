import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router) {}

  canActivate(): boolean {
    return this.checkAdminAccess();
  }

  canActivateChild(): boolean {
    return this.checkAdminAccess();
  }

  private checkAdminAccess(): boolean {
    const token = localStorage.getItem('access_token'); // Or your actual key
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    try {
      const decoded: any = jwtDecode(token);
      const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      const username = decoded['name']; // or you can use email

      console.log('Username:', username);
      console.log('Role:', role);
      console.log('Token:', token);

      if (role === 'Admin') {
        return true;
      } else {
        this.router.navigate(['']);
        return false;
      }
    } catch (error) {
      console.error('Token decode error:', error);
      this.router.navigate(['/login']);
      return false;
    }
  }
}
