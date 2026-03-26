import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageFormInputComponent } from './message-form-input.component';

describe('MessageFormInputComponent', () => {
  let component: MessageFormInputComponent;
  let fixture: ComponentFixture<MessageFormInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessageFormInputComponent],
    });
    fixture = TestBed.createComponent(MessageFormInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
