import { Component, Input } from '@angular/core';
import { Message } from '../main.component';

@Component({
  selector: 'app-normal-event',

  templateUrl: './index.component.html',
  styleUrls: ['./style.component.scss'],
})
export class NormalEventComponent {
  @Input() message!: Message; // Decorate the property with @Input()
}
