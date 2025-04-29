import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddTripComponent } from './admin-add-trip.component';

describe('AdminAddTripComponent', () => {
  let component: AdminAddTripComponent;
  let fixture: ComponentFixture<AdminAddTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAddTripComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
