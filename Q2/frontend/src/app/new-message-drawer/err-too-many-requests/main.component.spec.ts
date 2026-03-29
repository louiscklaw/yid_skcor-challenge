import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrTooManyRequestsComponent } from './err-too-many-requests.component';

describe('ErrTooManyRequestsComponent', () => {
  let component: ErrTooManyRequestsComponent;
  let fixture: ComponentFixture<ErrTooManyRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrTooManyRequestsComponent]
    });
    fixture = TestBed.createComponent(ErrTooManyRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
