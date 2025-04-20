import { TourComponent } from './tour/tour.component';
import { Component } from '@angular/core';
//import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { OverviewComponent } from './overview/overview.component';

@Component({
  selector: 'app-root',
  imports: [TourComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Behdety';
}
