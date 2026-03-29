import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LowCountComponent } from './low-count.component';

describe('LowCountComponent', () => {
  let component: LowCountComponent;
  let fixture: ComponentFixture<LowCountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LowCountComponent]
    });
    fixture = TestBed.createComponent(LowCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
