interface Trip {
  tripId: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  duration: number;
  money: number;
  availablePeople: number;
  maxPeople: number;
  isDeleted: boolean;
  outOfDate: boolean;
  includedItems: string[];
  excludedItems: string[];
  sites: number[];
}

interface TripCreateDto {
  tripId?: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  duration: number;
  money: number;
  availablePeople: number;
  maxPeople: number;
  isDeleted?: boolean;
  outOfDate?: boolean;
  includedItems: string[];
  excludedItems: string[];
  sites: number[];
}
