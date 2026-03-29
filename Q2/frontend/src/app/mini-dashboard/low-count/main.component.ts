// REQ_04: Show a count of events by priority
import { Component } from '@angular/core';
import { GlobalDataService } from 'src/app/core/global-data.service';

@Component({
  selector: 'app-low-count',
  templateUrl: './index.component.html',
  styleUrls: ['./style.component.scss'],
})
export class LowCountComponent {
  low_count: string = '0';
  isToggled: boolean = false;
  isActive: boolean = false;

  constructor(private globalData: GlobalDataService) {}

  ngOnInit() {
    this.globalData.currentLowCount.subscribe((res) => {
      this.low_count = res;
    });

    this.globalData.currentLowActive.subscribe((res) => {
      this.isActive = res;
    });
  }

  toggleLowFilter() {
    if (!this.isActive) {
      this.globalData.updateLowActive(true);
      this.globalData.updateHighActive(false);
      this.globalData.updateNormalActive(false);
    } else {
      this.globalData.updateLowActive(false);
    }

    if (this.isActive) {
      this.globalData.updateMsgFilterToLow();
    } else {
      this.globalData.updateMsgFilterToAll();
    }

    this.globalData.updateMessageList();
  }
}
