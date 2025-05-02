// book.model.ts
export interface Book {
  bookId: string;
  tripId: string;
  tripName: string;
  applicationUserId: string;
  dateBook?: Date;
  startComingDate: Date;
  endComingDate: Date;
  numberDays: number;
  numberPeople: number;
  amountMoney: number;

  // Add any other properties your booking might have
}

// Create these interfaces in a shared models file (e.g., models/booking.ts)

export interface BookingResponse {
  bookId: string;
  tripId: string;
  tripName: string;
  applicationUserId: string;
  dateBook: string;
  startComingDate: string;
  endComingDate: string;
  numberDays: number;
  numberPeople: number;
  amountMoney: number;
}

export interface PaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
  amount: number;
  currency: string;
  status: string;
}

///
export interface CreateBookDto {
  tripName: string;
  startComingDate: string; // ISO date
  endComingDate: string;
  numberPeople: number;
  numberDays?: number;
  amountMoney?: number;
}

export interface BookDetailDto {
  bookId: string;
  tripId: string;
  tripName?: string;
  applicationUserId?: string;
  dateBook?: string;
  startComingDate: string;
  endComingDate: string;
  numberDays: number;
  numberPeople: number;
  amountMoney: number;
}