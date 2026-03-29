import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalEventComponent } from './normal-message.component';

describe('NormalEventComponent', () => {
  let component: NormalEventComponent;
  let fixture: ComponentFixture<NormalEventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NormalEventComponent],
    });
    fixture = TestBed.createComponent(NormalEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
