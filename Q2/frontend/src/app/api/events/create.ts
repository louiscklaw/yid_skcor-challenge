import { HttpClient } from '@angular/common/http';
import { EVENTS_ENDPOINT } from 'src/app/config';

export function createEvent(
  http: HttpClient,
  msgPrio: string,
  msgBody: string,
) {
  return http.post(EVENTS_ENDPOINT, {
    msgType: 'message',
    msgBody,
    msgPrio,
  });
}
