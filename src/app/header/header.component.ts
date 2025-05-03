// header.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth-service.service';


@Component({
  standalone: true,
  imports: [RouterLink, CommonModule],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isMenuOpen = false;
  isUserDropdownOpen = false;
  currentUser$;

  constructor(private authService: AuthService) {
    this.currentUser$ = this.authService.currentUser$;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleUserDropdown(): void {
    this.isUserDropdownOpen = !this.isUserDropdownOpen;
  }

  logout(): void {
    this.authService.logout();
    this.isUserDropdownOpen = false;
  }

  // header.component.ts
getUserInitial(user: any): string {
 
  return user?.firstName?.charAt(0)?.toUpperCase() || 
         user?.email?.charAt(0)?.toUpperCase() || 
         'U';
}
}