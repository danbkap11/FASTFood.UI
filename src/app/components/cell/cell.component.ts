import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CellModel } from 'src/app/models/cell';
import { FoodModel } from 'src/app/models/food';
import { StoreModel } from 'src/app/models/store';
import { SharedService } from 'src/app/service/shared.service';
import { SubjectsDataService } from 'src/app/service/subject.service';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styles: [
  ],
})
export class CellComponent implements OnInit, OnDestroy{
  private ngUnsubscribe = new Subject();
  @Input() cellModel = {} as CellModel;

  selectedFood!: FoodModel;
  provider!: StoreModel;

  cellForm = new FormGroup({
    foodId: new FormControl('', [Validators.required]),
    providerId: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    weight: new FormControl('', [Validators.required])
  });

  constructor(
    public sharedService: SharedService,
    public formBuilder: FormBuilder,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private subjects: SubjectsDataService
  ) { }

  ngOnInit(): void {
    this.subjects.subject(2)
    .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((food: FoodModel) => {
        if(!this.selectedFood || food.id !== this.selectedFood.id){
          this.selectedFood = food;
          this.cellForm.controls.foodId.setValue(food.id);
          this.provider = {} as StoreModel;
        }
        document.getElementById('closeFoodArea')?.click();
      });
      this.subjects.subject(3)
      .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((provider: StoreModel) => {
          this.provider = provider;
          this.cellForm.controls.providerId.setValue(provider.id);
          if(provider.userId !== this.sharedService.user.id){
            this.sharedService;
          }
          document.getElementById('closeProviderArea')?.click();
        });
    if(this.cellModel.providerId && this.cellModel.status !=='EMPTY'){
      this.selectedFood = {} as FoodModel;
      this.selectedFood.id =this.cellModel.foodId;
      this.selectedFood.description = this.cellModel.foodDescription;
      this.selectedFood.temp = this.cellModel.temp;
      this.selectedFood.name = this.cellModel.foodName;

      this.provider = {} as StoreModel;
      this.provider.id = this.cellModel.providerId;
      this.provider.userId = this.cellModel.providerUserId;
      this.provider.name = this.cellModel.providerName;
      this.provider.price = this.cellModel.providerPrice;
      this.provider.location = this.cellModel.providerLocation;

      this.cellForm.controls.price.setValue(this.cellModel.price);
      this.cellForm.controls.weight.setValue(this.cellModel.weight);
    }
  }

  updateCell = () => {
    if (this.validate()) {      
      const request = {
        id: this.cellModel.id,
        foodId: this.cellForm.controls.foodId.value,
        weight: this.cellForm.controls.weight.value,
        price: this.cellForm.controls.price.value,
        providerId: this.cellForm.controls.providerId.value,
      } as CellModel;
      this.sharedService.updateCellInfo(request);
    }
  }
  clearCell = () => {
    const request = {
      id: this.cellModel.id
    }
    this.sharedService.cellToEmpty(request);
  }
  

  selectFood = (foodArea: any) => {
    this.modalService.open(foodArea, { size: 'xl', scrollable: true });
  }

  validate = () => {
    if (this.cellForm.invalid) {
      if(this.cellForm.controls.foodId.invalid){
        this.sharedService.warningToast('Invalid food');    
      }
      if(this.cellForm.controls.providerId.invalid){
        this.sharedService.warningToast('Invalid provider');    
      }
      if(this.cellForm.controls.price.invalid){
        this.sharedService.warningToast('Invalid price');    
      }
      if(this.cellForm.controls.weight.invalid){
        this.sharedService.warningToast('Invalid weight');    
      }
      return false;
    }    
    return true;
  }

  selectProvider =  (providerArea: any) => {
    this.modalService.open(providerArea, { size: 'xl', scrollable: true });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
