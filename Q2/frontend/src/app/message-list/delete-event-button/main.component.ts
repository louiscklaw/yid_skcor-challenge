import { HttpClient } from '@angular/common/http';
import { Component, inject, Input } from '@angular/core';
import { deleteEvent } from 'src/app/api/events/delete';
import { NotificationsService } from 'src/app/core/notifications.service';

@Component({
  selector: 'app-delete-message-button',
  templateUrl: './index.component.html',
  styleUrls: ['./style.component.scss'],
})
export class DeleteEventButtonComponent {
  @Input() msg_id: number = -1;
  private http = inject(HttpClient);
  private notify = inject(NotificationsService);

  onDeleteButtonClick() {
    deleteEvent(this.http, this.msg_id).subscribe({
      next: (response: any) => {
        // TODO: better delete done notification
        // alert('delete done');
        this.notify.show('message deleted', 'success');
      },
    });
  }
}
