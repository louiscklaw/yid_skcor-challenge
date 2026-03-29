import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Error429DialogService {
  // TODO: rename me
  private display = new BehaviorSubject<boolean>(false);

  // TODO: rename me

  watch$ = this.display.asObservable();

  constructor() {}

  open() {
    this.display.next(true);
  }

  close() {
    this.display.next(false);
  }
}
