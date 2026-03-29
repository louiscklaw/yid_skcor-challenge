import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMessageButtonComponent } from './delete-message-button.component';

describe('DeleteMessageButtonComponent', () => {
  let component: DeleteMessageButtonComponent;
  let fixture: ComponentFixture<DeleteMessageButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteMessageButtonComponent],
    });
    fixture = TestBed.createComponent(DeleteMessageButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
