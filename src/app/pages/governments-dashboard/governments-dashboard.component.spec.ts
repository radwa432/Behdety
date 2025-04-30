import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovernmentsComponent } from './governments-dashboard.component';

describe('GovernmentsDashboardComponent', () => {
  let component: GovernmentsComponent;
  let fixture: ComponentFixture<GovernmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GovernmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GovernmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
