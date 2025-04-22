import { BlogListComponent } from './components/blog-list/blog-list.component';
// app.routes.ts

import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { FaqsComponent} from './faqs/faqs.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { LoginComponent } from './login/login.component';
import { TourComponent } from './tour/tour.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { OverviewComponent } from './overview/overview.component';
import { PaymentComponent } from './payment/payment.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'tours', component: TourComponent },
  { path: 'about', component: AboutComponent},
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  {path:'Overview',component:OverviewComponent},
  {path:'faqs',component:FaqsComponent},
  {path: 'blog',
    loadComponent: () => import('./components/blog-list/blog-list.component').then(m => m.BlogListComponent)
  },
 { path: 'post/:id',
  loadComponent: () => import('./pages/post-details/post-details.component').then(m => m.PostDetailsComponent)
},
{
  path: 'author/:id',
  loadComponent: () => import('./pages/author-posts/author-posts.component').then(m => m.AuthorPostsComponent)
},
{
  path: 'category/:id',
  loadComponent: () => import('./pages/category-posts/category-posts.component').then(m => m.CategoryPostsComponent)
}
,
{
  path: 'checkout',
  component: PaymentComponent
}


];
