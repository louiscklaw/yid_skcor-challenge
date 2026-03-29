import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
  AFTER_RESET_MESSAGE,
  INITIAL_MESSAGE_PRIORITY,
  INITIAL_MESSAGE,
  MSG_PRIO_LOW_SIGNATURE,
  MSG_PRIO_NORMAL_SIGNATURE,
  MSG_PRIO_HIGH_SIGNATURE,
  MSG_PRIO_LOW,
  MSG_PRIO_NORMAL,
  MSG_PRIO_HIGH,
} from '../config';
import { Error429DialogService } from '../core/error-dialog.service';
import { createEvent } from '../api/events/create';

interface MsgPrio {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-new-event-drawer',
  templateUrl: './index.component.html',
  styleUrls: ['./style.component.scss'],
})
export class NewEventDrawerComponent {
  @ViewChild('drawerToggle') drawerToggle!: ElementRef<HTMLInputElement>;

  private http = inject(HttpClient);

  contactForm: FormGroup;
  data: any;

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

  constructor(
    private fb: FormBuilder,
    public error429Dialog: Error429DialogService,
  ) {
    // Initialize the form
    this.contactForm = this.fb.group({
      msgPrio: [INITIAL_MESSAGE_PRIORITY, [Validators.required]],
      msgType: ['message', [Validators.required]],
      msgBody: [INITIAL_MESSAGE],
    });
  }

  closeDrawer() {
    if (this.drawerToggle) {
      this.drawerToggle.nativeElement.checked = false;
    }
  }

  resetForm() {
    this.contactForm = this.fb.group({
      msgPrio: [INITIAL_MESSAGE_PRIORITY, [Validators.required]],
      msgType: ['message', [Validators.required]],
      msgBody: [AFTER_RESET_MESSAGE],
    });
  }

  handleSubmit() {
    let { msgType, msgBody, msgPrio } = this.contactForm.value;

    // louislaw: not a fetch in the webkit/gecko but angular implementation of post call
    createEvent(this.http, msgPrio, msgBody).subscribe({
      next: (response) => {
        this.data = response;
        this.resetForm();
        this.closeDrawer();
      },
      error: (err) => {
        // REQ_05: Handle the 429 case gracefully in the UI
        this.error429Dialog.open();
      },
    });
  }
}
