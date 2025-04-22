import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Author, BlogPost } from '../models/blog-post.model';
import { Category } from '../models/blog-post.model';

@Injectable({ providedIn: 'root' })
export class BlogService {
  private apiUrl = 'https://localhost:44334/api';

  constructor(private http: HttpClient) {}

  getPosts(pageNumber = 1, pageSize = 5, search = '', categoryId?: number): Observable<any> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);

    if (search) params = params.set('search', search);
    if (categoryId != null) {
      params = params.set('categoryId', categoryId.toString());
    }

    return this.http.get(`${this.apiUrl}/BlogPost`, { params });
  }


  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/BlogCategory`);
  }

  getLastPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${this.apiUrl}/BlogPost/last`);
  }

  getPostById(id: number): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${this.apiUrl}/BlogPost/${id}`);
  }


//author posts
  getPostsByAuthor(authorId: number): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${this.apiUrl}/Author/${authorId}/posts`);
  }

  getAuthorById(authorId: number): Observable<Author> {
    return this.http.get<Author>(`${this.apiUrl}/Author/${authorId}`);
  }

  //categories
 /* getPostsByCategory(categoryId: number): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${this.apiUrl}/BlogCategory/${categoryId}/posts`);
  }*/
  


  getPostsByCategory(categoryId: number, pageNumber = 1, pageSize = 5): Observable<any> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);

    return this.http.get(`${this.apiUrl}/BlogCategory/${categoryId}/posts`, { params });
  }

  searchPosts(search: string, pageNumber = 1, pageSize = 5): Observable<any> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize)
      .set('search', search);

    return this.http.get(`${this.apiUrl}/BlogPost/search`, { params });
  }

  getrelatedposts(postId:number, categoryId: number, pageSize = 2): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${this.apiUrl}/BlogCategory/${categoryId}/posts`, { params: { postId, pageSize } });
}
}