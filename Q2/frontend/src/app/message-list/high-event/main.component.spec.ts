import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighEventComponent } from './main.component';

describe('HighMessageComponent', () => {
  let component: HighEventComponent;
  let fixture: ComponentFixture<HighEventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HighEventComponent],
    });
    fixture = TestBed.createComponent(HighEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
