// src/app/models/stripe.models.ts
export interface PaymentDto {
  paymentMethodId: string;
  customerId: string;
}

export interface StripePaymentRequestDto {
  email: string;
  paymentMethodId: string;
}

export interface StripeProductDto {
  id: string;
  name: string;
  amount: number;
  currency: string;
  interval: string;
}

export interface SubscriptionDto {
  subscriptionId: string;
  customerId: string;
  productId: string;
}
