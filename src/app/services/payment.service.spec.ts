// book.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { BookingResponse } from '../models/book';


@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = `${environment.apiUrl}/api/Books`;

  constructor(private http: HttpClient) { }

  createPaymentIntent(
    bookingId: string,
    tripId: string,
    amount: number,
    customerEmail: string
  ): Observable<any> {
    const body = {
      bookingId,
      tripId,
      amount,
      customerEmail,
    };
    return this.http.post(`${this.apiUrl}/create-payment-intent`, body);
  }
}
