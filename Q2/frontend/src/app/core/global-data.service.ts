// ng generate service core/global-data
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import {
  EVENTS_ENDPOINT,
  MSG_PRIO_HIGH,
  MSG_PRIO_LOW,
  MSG_PRIO_NORMAL,
} from '../config';

@Injectable({
  providedIn: 'root',
})
export class GlobalDataService {
  private http = inject(HttpClient);

  // share the accounting of different priority
  private highCountSource = new BehaviorSubject<string>('0');
  private lowCountSource = new BehaviorSubject<string>('0');
  private normalCountSource = new BehaviorSubject<string>('0');

  private isHighActivSource = new BehaviorSubject<boolean>(false);
  private isNormalActivSource = new BehaviorSubject<boolean>(false);
  private isLowActivSource = new BehaviorSubject<boolean>(false);

  private activeMsgListFilterSource = new BehaviorSubject<string>('all');
  private messagesSource = new BehaviorSubject<{}[]>([]);

  private helloCallSource = new Subject<void>();
  helloCall$ = this.helloCallSource.asObservable();
  triggerHello() {
    this.helloCallSource.next();
  }

  private updateMessagesCallSource = new Subject<void>();
  updateMessagesCall$ = this.updateMessagesCallSource.asObservable();
  updateMessageList() {
    this.updateMessagesCallSource.next();
  }

  // TODO: add '$' at the end
  currentHighCount = this.highCountSource.asObservable();
  currentLowCount = this.lowCountSource.asObservable();
  currentNormalCount = this.normalCountSource.asObservable();

  // for filter toggle
  currentHighActive = this.isHighActivSource.asObservable();
  currentNormalActive = this.isNormalActivSource.asObservable();
  currentLowActive = this.isLowActivSource.asObservable();

  currentEventListFilter = this.activeMsgListFilterSource.asObservable();
  currentMessages = this.messagesSource.asObservable();

  constructor() {}

  updateHighCount(newRole: string) {
    this.highCountSource.next(newRole);
  }

  updateLowCount(newRole: string) {
    this.lowCountSource.next(newRole);
  }

  updateNormalCount(newRole: string) {
    this.normalCountSource.next(newRole);
  }

  updateMessages(newMessages: {}[]) {
    this.messagesSource.next(newMessages);
  }

  updateMsgFilter(msgPrio: string) {
    this.activeMsgListFilterSource.next(msgPrio);
  }
  updateMsgFilterToAll() {
    // TODO: refactor to constant
    this.updateMsgFilter('all');
  }
  updateMsgFilterToHigh() {
    // TODO: refactor to constant
    this.updateMsgFilter('high');
  }
  updateMsgFilterToNormal() {
    // TODO: refactor to constant
    this.updateMsgFilter('normal');
  }
  updateMsgFilterToLow() {
    // TODO: refactor to constant
    this.updateMsgFilter('low');
  }

  updateHighActive(newState: boolean) {
    this.isHighActivSource.next(newState);
  }

  updateNormalActive(newState: boolean) {
    this.isNormalActivSource.next(newState);
  }

  updateLowActive(newState: boolean) {
    this.isLowActivSource.next(newState);
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
