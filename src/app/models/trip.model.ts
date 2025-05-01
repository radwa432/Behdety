// trip.model.ts
export interface TripGetDto {
  tripId: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  duration: number;
  money: number;
  availablePeople: number;
  maxPeople: number;
  tripRating: number;
  userNumbersRating: number;
  isDeleted: boolean;
  outOfDate: boolean;
  includedItems: string[];
  excludedItems: string[];
}

export interface TripCreateDto {
  tripId: string;
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  duration: number;
  money: number;
  availablePeople: number;
  maxPeople: number;
  isDeleted?: boolean;
  outOfDate?: boolean;
  includedItems?: string[];
  excludedItems?: string[];
  sites?: number[];
}

export interface TripUpdateDto {
  tripId: string;
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  duration: number;
  money: number;
  availablePeople: number;
  maxPeople: number;
  isDeleted?: boolean;
  outOfDate?: boolean;
  includedItems?: string[];
  excludedItems?: string[];
  sites?: string[];
}
