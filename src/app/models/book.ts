// src/app/models/book.model.ts
export interface Book {
  bookId: string;
  tripId: string;
  applicationUserId: string;
  dateBook?: Date;
  startComingDate: Date;
  endComingDate: Date;
  numberDays: number;
  numberPeople: number;
  amountMoney: number;
}

export interface BookCreateDto {
  tripId: string;
  startComingDate: string;
  endComingDate: string;
  numberPeople: number;
  amountMoney: number;
}
