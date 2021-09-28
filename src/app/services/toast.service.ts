import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }
  toasts: any[] = [];

  private show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
  showSuccess(textOrTpl: string | TemplateRef<any>) {
    this.show(textOrTpl, { classname: 'bg-success text-light', delay: 10000 });
  }
  showError(textOrTpl: string | TemplateRef<any>) {
    this.show(textOrTpl, { classname: 'bg-danger text-light', delay: 15000 });
  }
}
