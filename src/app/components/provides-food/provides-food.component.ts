import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { StoreModel } from 'src/app/models/store';
import { SharedService } from 'src/app/service/shared.service';
import { SubjectsDataService } from 'src/app/service/subject.service';

@Component({
  selector: 'app-provides-food',
  templateUrl: './provides-food.component.html',
  styleUrls: []
})
export class ProvidesFoodComponent implements OnInit, OnDestroy{
  private ngUnsubscribe = new Subject();
  @Input() shopId = -1;

  constructor(
    public sharedService: SharedService,
    private subjects: SubjectsDataService
  ) { }

  sortedProvidersOfFood = [] as StoreModel[];

  ngOnInit(): void {
    
    this.sharedService.providersOfFood.forEach(p => {
      if(p.providerId = this.shopId){
        this.sortedProvidersOfFood.push(p);
      }
    });
    
  }

  removeFromProvide = (provider: StoreModel) => {

  }

  addToProvide = () => {

  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
