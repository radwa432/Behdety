import { TestBed } from '@angular/core/testing';

import { BookingDashboardService } from './booking-dashboard.service';

describe('BookingDashboardService', () => {
  let service: BookingDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
