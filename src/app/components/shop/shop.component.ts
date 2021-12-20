import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StorageModel, StoreModel } from 'src/app/models/store';
import { SharedService } from 'src/app/service/shared.service';
import { SubjectsDataService } from 'src/app/service/subject.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: []
})
export class ShopComponent implements OnInit, OnDestroy{
  private ngUnsubscribe = new Subject();
  @Input() shop = {} as StoreModel;
  
  selectedStorage = {} as StorageModel;
  isShop =this.sharedService.isShop;

  constructor(
    public sharedService: SharedService,
    public formBuilder: FormBuilder,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private subjects: SubjectsDataService
  ) { }

  ngOnInit(): void {
    this.subjects.subject(5)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((storage) => {
      this.selectedStorage = JSON.parse(storage);
      const index = this.shop.storageList.findIndex(s => s.id === this.selectedStorage.id);
      this.shop.storageList[0] = this.selectedStorage;
      document.getElementById('closeStorageArea')?.click();
    });

    this.subjects.subject(6)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(() => {
      document.getElementById('closeUpdateShopArea')?.click();
    });

    this.subjects.subject(8)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(() => {
      this.shop = this.sharedService.shops.find(s=>s.id === this.shop.id);
      this.sharedService.culcFullness(this.shop);
    });

    this.subjects.subject(7)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(() => {
      document.getElementById('closeCreateStorageArea')?.click();
    });

    this.subjects.subject(9)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(() => {
      this.shop = this.sharedService.shops.find(s=>s.id === this.shop.id);
      this.sharedService.culcFullness(this.shop);
    });
    
    this.sharedService.culcFullness(this.shop);
  }

  createStorage = (content: any) => {
    this.modalService.open(content, { scrollable: true });
  }

  
  updateStorage = (content: any, storage: StorageModel) => {
    this.selectedStorage = storage;
    this.modalService.open(content, { size: 'lg', scrollable: true });
  }

  updateShop = (content: any) => {
    this.modalService.open(content, { scrollable: true });
  }

  showOrders = (content: any) =>{
    this.modalService.open(content, { scrollable: true });    
  }

  showWhatProvide = (content: any) =>{
    this.modalService.open(content, { scrollable: true });    
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
