import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StoreModel } from 'src/app/models/store';
import { SharedService } from 'src/app/service/shared.service';
import { SubjectsDataService } from 'src/app/service/subject.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styles: [
  ],
})
export class ShopsComponent implements OnInit, OnDestroy{
  private ngUnsubscribe = new Subject();
  shops!: StoreModel[];
  isShop =this.sharedService.isShop;
  selectedShop = {} as StoreModel;

  constructor(
    private sharedService: SharedService,
    public formBuilder: FormBuilder,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private subjects: SubjectsDataService) { }

  ngOnInit(): void {
    if(this.isShop){
      this.sharedService.activePage = "Shops";
    } else {
      this.sharedService.activePage = "Warehouses";
    }
    
    
    this.shops = this.sharedService.shops;
    this.subjects.subject(6)
    .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.shops = this.sharedService.shops;
        const s = this.sharedService.shops.find(v => v.id === this.selectedShop.id);
        this.selectedShop = s!;
        document.getElementById('closeCreateShopArea')?.click();
      });
  }

  createShop = (content: any) => {
    this.modalService.open(content, { scrollable: true });    
  }

  openShop(content: any, shop: StoreModel) {
    this.selectedShop = shop;
    this.modalService.open(content, { size: 'xl', scrollable: true });
  }

  click() {
    this.modalService.dismissAll();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
