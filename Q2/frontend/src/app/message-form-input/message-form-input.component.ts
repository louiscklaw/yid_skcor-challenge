import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../err-dialog-429/err_dialog.component';
import {
  AFTER_RESET_HELLOWORLD_MESSAGE,
  INITIAL_MESSAGE_PRIORITY,
  EVENTS_ENDPOINT,
  INITIAL_HELLOWORLD_MESSAGE,
  MSG_PRIO_LOW_SIGNATURE,
  MSG_PRIO_NORMAL_SIGNATURE,
  MSG_PRIO_HIGH_SIGNATURE,
  MSG_PRIO_LOW,
  MSG_PRIO_NORMAL,
  MSG_PRIO_HIGH,
} from '../config';

interface MsgPrio {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-message-form-input',
  templateUrl: './message-form-input.component.html',
  styleUrls: ['./message-form-input.component.css'],
})
export class MessageFormInputComponent {
  contactForm: FormGroup;

  private http = inject(HttpClient);
  data: any;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) {
    ``;
    // Initialize the form
    this.contactForm = this.fb.group({
      msgPrio: [INITIAL_MESSAGE_PRIORITY, [Validators.required]],
      msgType: ['message', [Validators.required]],
      msgBody: [INITIAL_HELLOWORLD_MESSAGE],
    });
  }

  // TODO: move up
  msgPrios: MsgPrio[] = [
    { value: MSG_PRIO_LOW, viewValue: MSG_PRIO_LOW_SIGNATURE },
    {
      value: MSG_PRIO_NORMAL,
      viewValue: MSG_PRIO_NORMAL_SIGNATURE,
    },
    {
      value: MSG_PRIO_HIGH,
      viewValue: MSG_PRIO_HIGH_SIGNATURE,
    },
  ];

  resetForm() {
    this.contactForm = this.fb.group({
      msgPrio: [INITIAL_MESSAGE_PRIORITY, [Validators.required]],
      msgType: ['message', [Validators.required]],
      msgBody: [AFTER_RESET_HELLOWORLD_MESSAGE],
    });
  }

  // REQ_03: A form to submit new events manually
  // REQ_05: Handle the 429 case gracefully in the UI
  handleSubmit() {
    //
    let { msgType, msgBody, msgPrio } = this.contactForm.value;

    // louislaw: not a fetch in the webkit/gecko but angular implementation of post call
    this.http
      .post(EVENTS_ENDPOINT, {
        msgType,
        msgBody,
        msgPrio,
      })
      .subscribe({
        next: (response) => {
          this.data = response;
          this.resetForm();
        },
        error: (err) => {
          // REQ_05: Handle the 429 case gracefully in the UI
          this.dialog.open(ErrorDialogComponent, { data: {} });
        },
      });
  }
}
