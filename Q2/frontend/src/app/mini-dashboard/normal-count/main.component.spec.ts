import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalCountComponent } from './normal-count.component';

describe('NormalCountComponent', () => {
  let component: NormalCountComponent;
  let fixture: ComponentFixture<NormalCountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NormalCountComponent]
    });
    fixture = TestBed.createComponent(NormalCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
