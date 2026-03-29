import { Component, Input } from '@angular/core';
import { Message } from '../main.component';

@Component({
  selector: 'app-high-event',
  templateUrl: './index.component.html',
  styleUrls: ['./style.component.scss'],
})
export class HighEventComponent {
  @Input() message!: Message; // Decorate the property with @Input()
}
