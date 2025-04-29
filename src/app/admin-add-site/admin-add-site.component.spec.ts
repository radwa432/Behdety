import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddSiteComponent } from './admin-add-site.component';

describe('AdminAddSiteComponent', () => {
  let component: AdminAddSiteComponent;
  let fixture: ComponentFixture<AdminAddSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAddSiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
