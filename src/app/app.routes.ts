import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { FaqsComponent } from './faqs/faqs.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { LoginComponent } from './login/login.component';
import { TourComponent } from './tour/tour.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { OverviewComponent } from './overview/overview.component';
import { CategoryDashboardComponent } from './pages/category-dashboard/category-dashboard.component';
import { TransportationsComponent } from './pages/transportations-dashboard/transportations-dashboard.component';
import { DriversDashboardComponent } from './pages/drivers-dashboard/drivers-dashboard.component';
import { ViewpostDashboardComponent } from './pages/viewpost-dashboard/viewpost-dashboard.component';
import { AuthorDashboardComponent } from './pages/author-dashboard/author-dashboard.component';
import { AuthorPostsComponent } from './pages/author-posts/author-posts.component';

import { AuthorpostdahboardComponent } from './pages/authorposts-dashboard/authorposts.component';
import { GovernmentsComponent } from './pages/governments-dashboard/governments-dashboard.component';

import { BookingConfirmationComponent } from './booking-confirmation/booking-confirmation.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminAddTripComponent } from './admin-add-trip/admin-add-trip.component';
import { AdminAddSiteComponent } from './admin-add-site/admin-add-site.component';
import { PaymentComponent } from './payment/payment.component';
import { BookingCanceledComponent } from './booking-canceled/booking-canceled.component';
//import { TripDashboardComponent } from './pages/trip-dashboard/trip-dashboard.component';
import { SiteDashboardComponent } from './pages/site-dashboard/site-dashboard.component';
import { TripDashboardComponent } from './pages/trip-dashboard/trip-dashboard.component';
//import { TripDashboardComponent } from './pages/trip-dashboard/trip-dashboard.component';
//import { TripDashboardComponent } from './pages/trip-dashboard/trip-dashboard.component';


import { BookingManagementComponent } from './pages/booking-dashboard/booking-dashboard.component';
import { BookingFormComponent } from './pages/bookingform-dashboard/bookingform-dashboard.component';
import { DashboardComponent } from './pages/postdashboard/postdashboard.component';
import { AdminGuard } from './admin-guard/admin-guard.component';
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'tours', component: TourComponent },
  { path: 'about', component: AboutComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'Overview/:id', component: OverviewComponent },
  { path: 'faqs', component: FaqsComponent },
  { path: 'Overview', component: OverviewComponent },
  { path: 'faqs', component: FaqsComponent },
 ///////////
  {
    path: 'post/:id',
    loadComponent: () => import('./pages/post-details/post-details.component').then(m => m.PostDetailsComponent)
  },
  {
    path: 'blog',
    loadComponent: () => import('./components/blog-list/blog-list.component').then(m => m.BlogListComponent)
  },
  {
    path: 'author/:id',
    loadComponent: () => import('./pages/author-posts/author-posts.component').then(m => m.AuthorPostsComponent)
  },
  {
    path: 'category/:id',
    loadComponent: () => import('./pages/category-posts/category-posts.component').then(m => m.CategoryPostsComponent)
  },
 //
  { path: 'payment/:bookingId', component: PaymentComponent },
  { path: 'payment', component: PaymentComponent },


  {
    path: 'admin-main',
    loadComponent: () => import('./admin-main/admin-main.component').then(m => m.AdminMainComponent),
    /*canActivate: [AdminGuard],
    canActivateChild: [AdminGuard],*/
    children: [
      { path: 'home', component: AdminHomeComponent },
      { path: 'trips/add', component: AdminAddTripComponent },
      { path: 'sites/add', component: AdminAddSiteComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      
      {
        path: 'dashboard/booking-management',
        children: [
          { path: '', component: BookingManagementComponent },
          { path: 'create', component: BookingFormComponent },
          { path: 'edit/:id', component: BookingFormComponent }
        ]
      },
      {
        path: 'dashboard/posts',
        component: DashboardComponent,
        title: 'Post Dashboard'
      },

      {
        path: 'create-post',
        loadComponent: () => import('./pages/postformCreate/post-form.component').then(m => m.CreatePostComponent),
        title: 'Create Post'
      },
      {
        path: 'edit-post/:id',
        loadComponent: () => import('./pages/postformCreate/post-form.component').then(m => m.CreatePostComponent),
        title: 'Edit Post'
      },
      {
        path: 'dashboard/viewpost/:id',
        component: ViewpostDashboardComponent,
        title: 'Post Dashboard'
      },
      {
        path: 'dashboard/categories',
        component: CategoryDashboardComponent,
        title: 'Category Dashboard'
      },
      {
        path: 'dashboard/transportations',
        component: TransportationsComponent,
        title: 'Transportations Dashboard'
      },
      {
        path: 'dashboard/drivers',
        component: DriversDashboardComponent,
        title: 'Drivers Dashboard'
      },

      {
        path: 'dashboard/governments',
        component: GovernmentsComponent,
        title: 'Governments Dashboard'
      },
      {
        path: 'dashboard/authors',
        component: AuthorDashboardComponent,
        title: 'Author Dashboard'
      },
      {
        path: 'dashboard/viewAuthorposts/:id',
        component: AuthorPostsComponent,
        title: 'Author Posts'
      },
    
      {
        path: 'dashboard/trip',
        component: TripDashboardComponent,
        title: 'Trip Dashboard'
      },
      {
        path: 'dashboard/site',
        component: SiteDashboardComponent,
        title: 'Site Dashboard'
      }
      ,

    ]
  },
    

  {
    path: 'booking-confirmation/:id',
    component: BookingConfirmationComponent,
    title: 'Booking Confirmation'
  },
 
  
  {
    path: 'booking-canceled',
    component: BookingCanceledComponent,
    title: 'Booking Canceled'
  },


  {
    path: 'governrate/:id',
    component: GovernmentsComponent
  },
  {
    path: 'government/:id',
    loadComponent: () => import('./components/site-by-government/sites-by-government.component').then(m => m.SitesByGovernmentComponent)
  }

  ,

    
     
      
    ];

  
    
  

 
 
  
 
  









    

