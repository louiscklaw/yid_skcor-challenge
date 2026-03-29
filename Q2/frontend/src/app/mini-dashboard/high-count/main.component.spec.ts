import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighCountComponent } from './high-count.component';

describe('HighCountComponent', () => {
  let component: HighCountComponent;
  let fixture: ComponentFixture<HighCountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HighCountComponent]
    });
    fixture = TestBed.createComponent(HighCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
