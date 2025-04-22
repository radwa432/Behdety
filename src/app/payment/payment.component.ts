import { Component } from '@angular/core';
import { StripeService } from '../stripe.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
})
export class PaymentComponent {
  constructor(private stripeService: StripeService) {}

  buyProduct() {
    const priceId = 'price_1Nxxxxxxx'; // Use actual Stripe Price ID from your dashboard
    this.stripeService.redirectToCheckout(priceId);
  }
}
