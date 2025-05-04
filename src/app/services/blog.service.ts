
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Author, BlogPost } from '../models/blog-post.model';
import { Category } from '../models/blog-post.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BlogService {
  private apiUrl = "https://localhost:44334/api";

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
  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(`${this.apiUrl}/Author`);
  }
  
  deleteAuthor(authorId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Author/${authorId}`); }

  createAuthor(author: Author): Observable<Author> {
    return this.http.post<Author>(`${this.apiUrl}/Author`, author, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  editAuthor(authorId: number, author: Author): Observable<Author> {
    return this.http.put<Author>(`${this.apiUrl}/Author/${authorId}`, author, {
      headers: { 'Content-Type': 'application/json' }
    });
  }


  //search posts
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

//dashboard postmethod
deletePost(postId: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/BlogPost/${postId}`);
}

createPost(post: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/BlogPost`, post, {
    headers: { 'Content-Type': 'application/json' }
  });
}

updatePost(postId: number, post: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/BlogPost/${postId}`, post, {
    headers: { 'Content-Type': 'application/json' }
  });

}
  //dashboard category method
  
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/BlogCategory`);
  }

 
  getPostsByCategory(categoryId: number, pageNumber = 1, pageSize = 5): Observable<any> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);

    return this.http.get(`${this.apiUrl}/BlogCategory/${categoryId}/posts`, { params });
  }
  
  createCategory(category: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/BlogCategory`, category);
  }
  
  updateCategory(id: number, category: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/BlogCategory/${id}`, category);
  }
  
  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/BlogCategory/${id}`);
  }



}
