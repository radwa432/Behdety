import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingformDashboardComponent } from './bookingform-dashboard.component';

describe('BookingformDashboardComponent', () => {
  let component: BookingformDashboardComponent;
  let fixture: ComponentFixture<BookingformDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingformDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingformDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
