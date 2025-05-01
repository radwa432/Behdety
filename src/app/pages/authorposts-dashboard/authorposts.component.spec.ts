import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorpostdahboardComponent } from './authorposts.component';

describe('AuthorpostsComponent', () => {
  let component: AuthorpostdahboardComponent;
  let fixture: ComponentFixture<AuthorpostdahboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorpostdahboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorpostdahboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
