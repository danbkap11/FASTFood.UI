import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastModel } from './models/toast';
import { SharedService } from './service/shared.service';
import { SubjectsDataService } from './service/subject.service';
import { ToastService } from './service/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [
  ],
})
export class AppComponent implements OnInit, OnDestroy{
  private ngUnsubscribe = new Subject();
  
  constructor(
    public sharedService: SharedService,
    public toastService: ToastService,
    private subjects: SubjectsDataService) { }

  ngOnInit(){
  this.subjects.subject(1)
    .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((toast: ToastModel) => {
      this.toastService.show(toast.text, { classname: toast.className, delay: toast.delay });
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

