import { Component } from '@angular/core';
import { Error429DialogService } from 'src/app/core/error-dialog.service';

@Component({
  selector: 'app-err-too-many-requests',
  templateUrl: './index.component.html',
  styleUrls: ['./style.component.scss'],
})
export class ErrTooManyRequestsComponent {
  // TODO: rename me
  constructor(public dialogService: Error429DialogService) {}
}
