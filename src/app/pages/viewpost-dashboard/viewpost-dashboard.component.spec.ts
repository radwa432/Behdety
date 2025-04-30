import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewpostDashboardComponent } from './viewpost-dashboard.component';

describe('ViewpostDashboardComponent', () => {
  let component: ViewpostDashboardComponent;
  let fixture: ComponentFixture<ViewpostDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewpostDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewpostDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
