import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingCanceledComponent } from './booking-canceled.component';

describe('BookingCanceledComponent', () => {
  let component: BookingCanceledComponent;
  let fixture: ComponentFixture<BookingCanceledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingCanceledComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingCanceledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
