import { TestBed } from '@angular/core/testing';

import { Error429DialogService } from './error-dialog.service';

describe('ErrorDialogService', () => {
  let service: Error429DialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Error429DialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
