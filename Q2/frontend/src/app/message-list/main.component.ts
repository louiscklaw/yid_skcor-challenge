import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { GlobalDataService } from '../core/global-data.service';
import { webSocket } from 'rxjs/webSocket';
import {
  EVENTS_ENDPOINT,
  MSG_PRIO_HIGH,
  MSG_PRIO_LOW,
  MSG_PRIO_NORMAL,
  WS_BASE_URL,
} from '../config';

// TODO: put into common place (e.g. lib) in next iteration.
const subject = webSocket(WS_BASE_URL);

@Component({
  selector: 'app-message-list',

  templateUrl: './index.component.html',
  styleUrls: ['./style.component.scss'],
})
export class EventListComponent {
  constructor(private globalData: GlobalDataService) {}

  // REQ_04: Show a count of events by priority
  low_count = 0;
  normal_count = 0;
  high_count = 0;
  // TODO: remove me
  messages = [{ hello: 'world' }];
  names = ['John', 'Jane', 'Amy', 'Emma'];
  currentEventListFilter = 'all';

  private http = inject(HttpClient);
  data: Messages = [];

  updateEvents() {
    this.http.get(EVENTS_ENDPOINT).subscribe({
      next: (response: any) => {
        let response_msgs: Messages = [];
        response_msgs = response.map((r: Message, i: number) => {
          const date = new Date(r.msgTimestamp * 1000);

          return {
            id: r.id,
            msgType: r.msgType,
            msgBody: r.msgBody,
            msgPrio: r.msgPrio,
            msgTimestamp: date.toLocaleString(),
          };
        });

        if (this.currentEventListFilter == 'all') {
          this.data = response_msgs;
        } else {
          this.data = response_msgs.filter(
            (m) => m.msgPrio == this.currentEventListFilter,
          );
        }

        // REQ_04: Show a count of events by priority
        this.low_count = 0;
        this.normal_count = 0;
        this.high_count = 0;
        for (let i = 0; i < response_msgs.length; i++) {
          this.low_count =
            response_msgs[i].msgPrio == MSG_PRIO_LOW
              ? this.low_count + 1
              : this.low_count;
          this.normal_count =
            response_msgs[i].msgPrio == MSG_PRIO_NORMAL
              ? this.normal_count + 1
              : this.normal_count;
          this.high_count =
            response_msgs[i].msgPrio == MSG_PRIO_HIGH
              ? this.high_count + 1
              : this.high_count;
        }

        this.globalData.updateLowCount(this.low_count.toString());
        this.globalData.updateNormalCount(this.normal_count.toString());
        this.globalData.updateHighCount(this.high_count.toString());

        // REQ_01: Display the live event feed, updating in real-time as new events arrive
        // this.dataSource = new MatTableDataSource<PeriodicElement>(this.data);
      },
      error: (err) => {
        // TODO: better handling of error
        // console.error(err);
      },
    });
  }

  ngOnInit() {
    subject.subscribe({
      // Called whenever there is a message from the server.
      next: (msg) => {
        this.updateEvents();
      },
      // Called if at any point WebSocket API signals some kind of error.
      error: (err) => {
        // TODO: better handling of error
        // console.error(err);
      },
      // Called when connection is closed (for whatever reason).
      complete: () => {
        // NOTE: placeholder
        // console.log('complete');
      },
    });

    this.globalData.currentEventListFilter.subscribe((res) => {
      this.currentEventListFilter = res;
    });

    // this.updateEvents();
    this.updateEvents();

    this.globalData.helloCall$.subscribe(() => {
      this.helloworld();
    });

    this.globalData.updateMessagesCall$.subscribe(() => {
      this.updateEvents();
    });
  }

  helloworld() {
    alert('helloworld from list');
  }
}

// TODO: rename the type name
export interface Message {
  msgType: string;
  id: number;
  msgBody: string;
  msgPrio: string;
  msgTimestamp: number;
}

export type Messages = Message[];
