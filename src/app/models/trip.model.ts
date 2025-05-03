// trip-get-dto.model.ts
export interface TripGetDto {
  tripId: string;
  name: string;
  description: string;
  startDate: string;  // Changed from Date to string
  endDate: string;    // Changed from Date to string
  duration: number;
  money: number;
  availablePeople: number;
  maxPeople: number;
  includedItems: string[];
  excludedItems: string[];
  sites: string[];
  tripImages: TripImageDto[];
}

export interface TripImageDto {
  id: number;
  tripId: string;
  imageUrl: string;
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
export interface Trip {
  TripId: string;
  Name: string;
  Description: string;

  TripImage : Trip[];
}

export interface TripImage {
  id: number;
  TripId: string;
  ImageUrl : string;
}