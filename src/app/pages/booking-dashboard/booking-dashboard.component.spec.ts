import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingDashboardComponent } from './booking-dashboard.component';

describe('BookingDashboardComponent', () => {
  let component: BookingDashboardComponent;
  let fixture: ComponentFixture<BookingDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
