export interface Trip {
  tripId: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  duration: number;
  money: number;
  availablePeople: number;
  maxPeople: number;
  isDeleted: boolean;
  outOfDate: boolean;
  transportationId?: string;
  includedItems: { name: string }[];
  excludedItems: { name: string }[];
  sites: any[];
  tripSites: any[];
  ratings: any[];
  transportation: any;
  applicationUsers: any[];
}
