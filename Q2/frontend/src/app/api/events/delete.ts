import { HttpClient } from '@angular/common/http';
import { EVENTS_ENDPOINT } from 'src/app/config';

export function deleteEvent(http: HttpClient, id: number) {
  return http.delete(EVENTS_ENDPOINT + '/' + id.toString(), {
    // TODO: add auth bearer ?
  });
}
