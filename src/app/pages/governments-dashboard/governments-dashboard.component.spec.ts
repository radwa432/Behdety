import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovernmentsDashboardComponent } from './governments-dashboard.component';

describe('GovernmentsDashboardComponent', () => {
  let component: GovernmentsDashboardComponent;
  let fixture: ComponentFixture<GovernmentsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GovernmentsDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GovernmentsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
