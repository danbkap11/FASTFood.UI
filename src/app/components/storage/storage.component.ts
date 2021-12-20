import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StorageModel } from 'src/app/models/store';
import { SharedService } from 'src/app/service/shared.service';
import { SubjectsDataService } from 'src/app/service/subject.service';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: []
})
export class StorageComponent implements OnInit, OnDestroy{
  private ngUnsubscribe = new Subject();
  @Input() storage = {} as StorageModel;
  @Input() storeRole = -1;
  @Input() shopId = -1;
  isShop =this.sharedService.isShop;




  constructor(
    public sharedService: SharedService,
    public formBuilder: FormBuilder,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private subjects: SubjectsDataService
  ) { }

  ngOnInit(): void {
    this.subjects.subject(7)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((storage: StorageModel) => {
      this.storage = storage;
      document.getElementById('closeCreateStorageArea')?.click();
    });
    this.subjects.subject(8)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((storage: StorageModel) => {
      this.storage = storage;
      document.getElementById('closeOrderFoodArea')?.click();
    });
    this.subjects.subject(9)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(() => {
      this.storage = this.sharedService.shops.find(s=>s.id === this.shopId).storageList.find(sl => sl.id === this.storage.id)
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  orderFood = (content: any) => {
    this.modalService.open(content, { scrollable: true }); 
  }

  updateStorage = (content: any) =>{
    this.modalService.open(content, { scrollable: true });    
  }

  showOrders = (content: any) =>{
    this.modalService.open(content, { scrollable: true });    
  }

  putFood = (content: any) => {
    this.modalService.open(content, { scrollable: true });   
  }

  clearStorage = () => {
    const req = {
      id: this.storage.id
    }
    this.sharedService.clearStorage(req);
  }
}
