// REQ_04: Show a count of events by priority
import { Component } from '@angular/core';
import { GlobalDataService } from 'src/app/core/global-data.service';

@Component({
  selector: 'app-normal-count',
  templateUrl: './index.component.html',
  styleUrls: ['./style.component.scss'],
})
export class NormalCountComponent {
  normal_count = '0';
  isToggled: boolean = false;
  isActive: boolean = false;

  constructor(private globalData: GlobalDataService) {}

  ngOnInit() {
    this.globalData.currentNormalCount.subscribe((res) => {
      this.normal_count = res;
    });

    this.globalData.currentNormalActive.subscribe((res) => {
      this.isActive = res;
      console.log(res);
    });
  }

  toggleNormalFilter() {
    if (!this.isActive) {
      this.globalData.updateNormalActive(true);
      this.globalData.updateHighActive(false);
      this.globalData.updateLowActive(false);
    } else {
      this.globalData.updateNormalActive(false);
    }

    if (this.isActive) {
      this.globalData.updateMsgFilterToNormal();
    } else {
      this.globalData.updateMsgFilterToAll();
    }
    this.globalData.updateMessageList();
  }
}
