// REQ_04: Show a count of events by priority
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { GlobalDataService } from 'src/app/core/global-data.service';

@Component({
  selector: 'app-high-count',
  templateUrl: './index.component.html',
  styleUrls: ['./style.component.scss'],
})
export class HighCountComponent {
  high_count: string = '';
  current_msg_list_filter: string = 'all';
  isActive: boolean = false;

  constructor(private globalData: GlobalDataService) {}
  private http = inject(HttpClient);

  ngOnInit() {
    this.globalData.currentHighCount.subscribe((res) => {
      this.high_count = res;
    });

    this.globalData.currentHighActive.subscribe((res) => {
      this.isActive = res;
      console.log(res);
    });
  }

  toggleHighFilter() {
    // this.isActive = !this.isActive;
    // if (this.isActive) {
    //   this.globalData.updateMsgFilterToHigh();
    //   this.globalData.updateMessageList();
    // } else {
    //   this.globalData.updateMsgFilterToAll();
    //   this.globalData.updateMessageList();
    // }
    if (!this.isActive) {
      this.globalData.updateHighActive(true);
      this.globalData.updateNormalActive(false);
      this.globalData.updateLowActive(false);
    } else {
      this.globalData.updateHighActive(false);
    }

    if (this.isActive) {
      this.globalData.updateMsgFilterToHigh();
    } else {
      this.globalData.updateMsgFilterToAll();
    }
    this.globalData.updateMessageList();
  }
}
