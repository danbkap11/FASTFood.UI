import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FoodInStorageModel, FoodModel } from 'src/app/models/food';
import { OrderModel } from 'src/app/models/order';
import { StorageModel, StoreModel } from 'src/app/models/store';
import { SharedService } from 'src/app/service/shared.service';
import { SubjectsDataService } from 'src/app/service/subject.service';

@Component({
  selector: 'app-set-food-in-storage',
  templateUrl: './set-food-in-storage.component.html',
  styleUrls: []
})
export class SetFoodInStorageComponent implements OnInit, OnDestroy{
  private ngUnsubscribe = new Subject();
  @Input() storageList = [] as StorageModel[];
  @Input() order = {} as OrderModel;;

  constructor(
    public sharedService: SharedService,
    private subjects: SubjectsDataService
  ) { }

  sortedFoodInStorageList = [] as FoodInStorageModel[];

  ngOnInit(): void {
    this.storageList.forEach(s => {
      s.foodInStorageModelList.forEach(fin => {
        if(fin.food.id === this.order.foodId &&  fin.quantity >= this.order.quantity){
          this.sortedFoodInStorageList.push(fin);
        }
      });
    });
  }


  selectThis = (foodInStorage: FoodInStorageModel) =>{
    const req = {
      id: this.order.id,
      foodInStorageId: foodInStorage.id
    } as any;
    this.sharedService.inProgressOrder(req);
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
