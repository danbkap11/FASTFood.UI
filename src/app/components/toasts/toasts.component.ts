import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  host: {'[class.ngb-toasts]': 'true'}
})
export class ToastsComponent implements OnInit {

  constructor(public toastService: ToastService) {}

  isTemplate(toast: { textOrTpl: any; }) { return toast.textOrTpl instanceof TemplateRef; }
  ngOnInit(): void {
  }

}
