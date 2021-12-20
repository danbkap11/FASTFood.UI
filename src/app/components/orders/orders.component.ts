import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FoodInStorageModel } from 'src/app/models/food';
import { OrderModel } from 'src/app/models/order';
import { StorageModel } from 'src/app/models/store';
import { IdModel } from 'src/app/models/userModels';
import { SharedService } from 'src/app/service/shared.service';
import { SubjectsDataService } from 'src/app/service/subject.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: []
})
export class OrdersComponent implements OnInit, OnDestroy{
  private ngUnsubscribe = new Subject();
  @Input() orderList = [] as OrderModel[];
  @Input() storeRole = -1;
  @Input() shopId = -1;
  @Input() storageId = -1;

  orderInProgress = [] as OrderModel[];
  orderSentRequest = [] as OrderModel[];
  orderCanceled = [] as OrderModel[];
  orderFinished = [] as OrderModel[];
  foodInStorage = {} as FoodInStorageModel
  quantityInselectedOrder = -1 as number;
  selectedOrder = {} as OrderModel;


  constructor(
    public sharedService: SharedService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private subjects: SubjectsDataService
  ) { }

  storageList = [] as StorageModel[];

  ngOnInit(): void {
    this.onInit();
    this.subjects.subject(9)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(() => {
      this.orderList = this.sharedService.shops.find(s=>s.id === this.shopId).storageList.find(sl => sl.id === this.storageId)?.orderList;
      this.onInit();
    });
  }

  onInit = () => {
    this.orderInProgress = [] as OrderModel[];
    this.orderSentRequest = [] as OrderModel[];
    this.orderCanceled = [] as OrderModel[];
    this.orderFinished = [] as OrderModel[];
    this.orderList.forEach(o => {
      switch(o.status) { 
        case 'SENT_REQUEST': { 
          this.orderSentRequest.push(o); 
          break; 
        } 
        case 'FINISHED': { 
          this.orderFinished.push(o); 
          break; 
        } 
        case 'INPROGRESS': { 
          this.orderInProgress.push(o); 
          break; 
        }
        case 'CANCELED': { 
          this.orderCanceled.push(o); 
          break; 
        }
      } 
    });
  }

  acceptOrders= (order: OrderModel, content: any) => {
    this.storageList= this.sharedService.shops.find(s=> s.id === this.shopId)?.storageList; 
    this.selectedOrder = order;
    this.modalService.open(content, { size: 'lg', scrollable: true });


  }
  cancelOrders = (id: number) => {
    let req;
    if(id === -1){
      let idList = [] as IdModel[];
      this.orderSentRequest.forEach(sr => {
        idList.push({id:sr.id} as IdModel);
      })
      req = {
        idList: idList
      } as any;
    } else {
      req = {
        id: id
      } as any;      
    }

    this.sharedService.cancelOrder(req);
  }

  toFinish = (id: number) => {
    const req = {
      id: id
    } as any;      

    this.sharedService.finishOrder(req);
    
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
