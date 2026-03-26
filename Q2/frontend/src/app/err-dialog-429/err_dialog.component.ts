// REQ_05: Handle the 429 case gracefully in the UI
import { Component } from '@angular/core';

import { MSG_PRIO_HIGH_SIGNATURE } from '../config';
@Component({
  selector: 'err-dialog',
  templateUrl: './err_dialog.html',
  styleUrls: ['./err_dialog.css'],
})
export class ErrorDialogComponent {
  TEXT_MSG_HIGH = MSG_PRIO_HIGH_SIGNATURE;
}
