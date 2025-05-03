// jwt.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class JwtService {
  decode(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }

  isTokenExpired(token: string): boolean {
    const decoded = this.decode(token);
    if (!decoded?.exp) return true;
    return Date.now() >= decoded.exp * 1000;
  }
}