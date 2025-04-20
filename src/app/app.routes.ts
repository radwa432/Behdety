import { Routes } from '@angular/router';

export const routes: Routes = [
{
  path: 'login',
  loadComponent: () => import('./login/login.component').then(c => c.LoginComponent)
},

{
  path: 'signup',
  loadComponent: () => import('./sign-up/sign-up.component').then(c => c.SignUpComponent)

}

];
