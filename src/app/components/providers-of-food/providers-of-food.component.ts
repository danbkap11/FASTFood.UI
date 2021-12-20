import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FoodModel } from 'src/app/models/food';
import { StoreModel } from 'src/app/models/store';
import { SharedService } from 'src/app/service/shared.service';
import { SubjectsDataService } from 'src/app/service/subject.service';

@Component({
  selector: 'app-providers-of-food',
  templateUrl: './providers-of-food.component.html',
  styles: [
  ],
})
export class ProvidersOfFoodComponent implements OnInit, OnDestroy{
  private ngUnsubscribe = new Subject();
  @Input() selectedFood = {} as FoodModel;
  constructor(
    public sharedService: SharedService,
    private subjects: SubjectsDataService
  ) { }

  isLoad = false;
  yourProviders = [] as StoreModel[];
  otherProviders = [] as StoreModel[];


  ngOnInit(): void {
    this.subjects.subject(4)
    .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        for ( const provider of this.sharedService.providersOfFood) {
          if(provider.userId === this.sharedService.user.id) {
            this.yourProviders.push(provider);
          } else {
            this.otherProviders.push(provider);
          }
        } 
        this.isLoad = true;
      });
    this.getListOfProviders();   
  }

  getListOfProviders = () => {
    const request = {
      id: this.selectedFood.id
    } as any;
    this.sharedService.getProvidersOfFood(request);
  }

  selectThis = (provider: StoreModel) =>{
    this.subjects.subject(3).next(provider);
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
