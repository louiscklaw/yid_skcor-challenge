import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor() {}

  // TODO: rewrite comment
  // 用 Signal 儲存目前嘅通知，冇就係 null
  activeToast = signal<Toast | null>(null);

  show(message: string, type: Toast['type'] = 'info') {
    this.activeToast.set({ message, type });

    // 3 秒後全自動消失
    setTimeout(() => {
      this.activeToast.set(null);
    }, 3000);
  }
}

export interface Toast {
  message: string;
  type: 'success' | 'error' | 'info';
}
