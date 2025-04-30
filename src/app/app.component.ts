

import { Component } from '@angular/core';
//import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { OverviewComponent } from './overview/overview.component';
import { NavigationEnd, RouterOutlet } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
<<<<<<< Updated upstream


@Component({
  selector: 'app-root',
imports:[RouterOutlet, HeaderComponent, FooterComponent],
=======
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CommonModule],
>>>>>>> Stashed changes
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {
  title = 'Behdety';

  //for delete header from some pages
  currentRoute: string = '';
  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.url;
      });
}
shouldShowHeader(): boolean {
  return !this.currentRoute.startsWith('/dashboard') && !this.currentRoute.startsWith('/create-post') && !this.currentRoute.startsWith('/edit-post/') ;
}
}