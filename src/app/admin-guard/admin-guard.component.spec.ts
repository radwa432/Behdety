import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGuard } from './admin-guard.component';

describe('AdminGuardComponent', () => {
  let component: AdminGuard;
  let fixture: ComponentFixture<AdminGuard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminGuard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminGuard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
