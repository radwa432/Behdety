import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { PostDetailsComponent } from './pages/post-details/post-details.component';

const routes: Routes = [   {
  path: '',
  loadComponent: () => import('./components/blog-list/blog-list.component').then(m => m.BlogListComponent)
},
{
  path: 'post/:id',
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

]; 

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
      provideHttpClient(withInterceptors([]))],
};
