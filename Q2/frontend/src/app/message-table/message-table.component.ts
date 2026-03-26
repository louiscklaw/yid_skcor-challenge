// REQ_01: Display the live event feed, updating in real-time as new events arrive
//
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { webSocket } from 'rxjs/webSocket';
import {
  CSS_MSG_PRIO_HIGH_COLOR,
  CSS_MSG_DEFAULT_COLOR,
  CSS_MSG_PRIO_LOW_COLOR,
  CSS_MSG_PRIO_NORM_COLOR,
  EVENTS_ENDPOINT,
  MSG_PRIO_HIGH,
  MSG_PRIO_HIGH_SIGNATURE,
  MSG_PRIO_LOW,
  MSG_PRIO_LOW_SIGNATURE,
  MSG_PRIO_NORMAL,
  MSG_PRIO_NORMAL_SIGNATURE,
  WS_BASE_URL,
} from '../config';

const subject = webSocket(WS_BASE_URL);

@Component({
  selector: 'app-message-table',
  templateUrl: './message-table.component.html',
  styleUrls: ['./message-table.component.css'],
})
export class MessageTableComponent implements AfterViewInit {
  // REQ_04: Show a count of events by priority
  low_count = 0;
  normal_count = 0;
  high_count = 0;

  private http = inject(HttpClient);
  data: PeriodicElement[] = [];

  // REQ_02: Visually distinguish events by priority (your design choice — just make it clear)
  displayedColumns: string[] = ['id', 'msgType', 'msgBody', 'msgPrio'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.data);

  // NOTE: starts as undefined, need to assigned by the time I use it.
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // REQ_02: Visually distinguish events by priority (your design choice — just make it clear)
  getPriorityColor(prio: string): string {
    switch (prio) {
      case MSG_PRIO_HIGH_SIGNATURE:
        return CSS_MSG_PRIO_HIGH_COLOR;
      case MSG_PRIO_NORMAL_SIGNATURE:
        return CSS_MSG_PRIO_NORM_COLOR;
      case MSG_PRIO_LOW_SIGNATURE:
        return CSS_MSG_PRIO_LOW_COLOR;
      default:
        return CSS_MSG_DEFAULT_COLOR;
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // REQ_01: Display the live event feed, updating in real-time as new events arrive
  // REQ_04: Show a count of events by priority
  // REQ_02: Visually distinguish events by priority (your design choice — just make it clear)
  updateEvents() {
    this.http.get(EVENTS_ENDPOINT).subscribe({
      next: (response: any) => {
        this.data = response.map((r: any, i: number) => {
          return {
            id: i,
            msgType: r.msgType,
            msgBody: r.msgBody,
            msgPrio: r.msgPrio,
          };
        });

        // REQ_04: Show a count of events by priority
        this.low_count = 0;
        this.normal_count = 0;
        this.high_count = 0;
        for (let i = 0; i < this.data.length; i++) {
          this.low_count =
            this.data[i].msgPrio == MSG_PRIO_LOW
              ? this.low_count + 1
              : this.low_count;
          this.normal_count =
            this.data[i].msgPrio == MSG_PRIO_NORMAL
              ? this.normal_count + 1
              : this.normal_count;
          this.high_count =
            this.data[i].msgPrio == MSG_PRIO_HIGH
              ? this.high_count + 1
              : this.high_count;
        }

        // REQ_01: Display the live event feed, updating in real-time as new events arrive
        this.dataSource = new MatTableDataSource<PeriodicElement>(this.data);
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

    this.updateEvents();
  }
}

export interface PeriodicElement {
  msgType: string;
  id: number;
  msgBody: string;
  msgPrio: string;
}
