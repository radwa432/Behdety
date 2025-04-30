// payment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = `${environment.apiUrl}/api/Payments`;

  constructor(private http: HttpClient) { }

  createCheckoutSession(
    bookingId: string,
    tripId: string,
    amount: number,
    baseUrl: string
  ) {
    return this.http.post<{sessionId: string, url: string}>(
      `${this.apiUrl}/create-checkout-session`,
      { bookingId, tripId, amount, baseUrl }
    );
  }
}
