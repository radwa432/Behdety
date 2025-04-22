import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  private stripePromise = loadStripe('pk_test_51RFbJC4bfO2JAI0zU19KsPcQeOP7EpYKiT16mmFOXLE7X0Sef1PwurzJvqFIBqf9MhiIkPzPPl8UbmLfj60KZ0c3000741c6Vl'); // Replace with your actual Stripe public key

  constructor(private http: HttpClient) {}

  async redirectToCheckout(priceId: string) {
    const stripe = await this.stripePromise;

    // Call your backend to create a session
    this.http.post<any>('https://localhost:44344/api/Stripe/pay', priceId, {
      headers: { 'Content-Type': 'application/json' },
    }).subscribe(async (res) => {
      const sessionId = res.sessionId;
      const result = await stripe?.redirectToCheckout({ sessionId });
      if (result?.error) {
        console.error(result.error.message);
      }
    });
  }
}
