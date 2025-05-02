import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitesByGovernmentComponent } from './sites-by-government.component';

describe('SitesByGovernmentComponent', () => {
  let component: SitesByGovernmentComponent;
  let fixture: ComponentFixture<SitesByGovernmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SitesByGovernmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SitesByGovernmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
