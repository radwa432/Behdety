import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface PaymentData {
  bookingId: string;
  amount: number;
  status: string;
}

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="payment-container">
      <div *ngIf="paymentData; else missingData">
        <h2>Payment Processing</h2>
        <div class="payment-status">
          <p>Amount: {{ paymentData.amount | currency }}</p>
          <div class="spinner" *ngIf="!paymentComplete"></div>
          <p *ngIf="paymentComplete" class="success-message">
            Payment successful! Redirecting...
          </p>
        </div>
      </div>

      <ng-template #missingData>
        <p class="error">Payment information missing. Redirecting...</p>
      </ng-template>
    </div>
  `,
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  paymentData: PaymentData | null = null;
  paymentComplete = false;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.paymentData = navigation?.extras.state as PaymentData;

    if (!this.paymentData) {
      console.error('No payment data received');
      setTimeout(() => this.router.navigate(['/']), 2000);
      return;
    }

    // Simulate payment processing (since backend already confirmed)
    setTimeout(() => {
      this.paymentComplete = true;
      setTimeout(() => {
        this.router.navigate(['/booking-confirmation', this.paymentData?.bookingId]);
      }, 1500);
    }, 2000);
  }
}
