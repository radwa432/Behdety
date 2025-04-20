import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { PostDetailsComponent } from './pages/post-details/post-details.component';
import { AuthorPostsComponent } from './pages/author-posts/author-posts.component';

const routes: Routes = [
  {
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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
