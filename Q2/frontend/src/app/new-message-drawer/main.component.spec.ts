import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMessageDrawerComponent } from './new-message-drawer.component';

describe('NewMessageDrawerComponent', () => {
  let component: NewMessageDrawerComponent;
  let fixture: ComponentFixture<NewMessageDrawerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewMessageDrawerComponent],
    });
    fixture = TestBed.createComponent(NewMessageDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
