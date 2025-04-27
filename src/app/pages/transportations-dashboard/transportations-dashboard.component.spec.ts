import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportationsComponent } from './transportations-dashboard.component';

describe('TransportationsDashboardComponent', () => {
  let component: TransportationsComponent;
  let fixture: ComponentFixture<TransportationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransportationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransportationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
