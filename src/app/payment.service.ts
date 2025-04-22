import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StripeService } from 'ngx-stripe';
import { Observable } from 'rxjs';
import { StripeCardElement } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(
    private stripeService: StripeService,
    private http: HttpClient
  ) {}

  createStripeToken(cardElement: StripeCardElement, name: string) {
    return this.stripeService.createToken(cardElement, { name });
  }

  sendPaymentToBackend(token: string, amount: number): Observable<any> {
    return this.http.post('https://localhost:44334/api/payment/charge', {
      tokenId: token,
      amount,
      currency: 'usd',
      description: 'Tour Booking'
    });
  }
}
