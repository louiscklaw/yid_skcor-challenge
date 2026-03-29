import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NotificationsService } from '../core/notifications.service';

@Component({
  selector: 'app-delete-success',
  templateUrl: './index.component.html',
  styleUrls: ['./style.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class DeleteSuccessComponent {
  notification = inject(NotificationsService);
}
