import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LowEventComponent } from './low-message.component';

describe('LowEventComponent', () => {
  let component: LowEventComponent;
  let fixture: ComponentFixture<LowEventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LowEventComponent],
    });
    fixture = TestBed.createComponent(LowEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
