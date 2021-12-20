import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FoodModel } from 'src/app/models/food';
import { OrderModel } from 'src/app/models/order';
import { StoreModel } from 'src/app/models/store';
import { SharedService } from 'src/app/service/shared.service';
import { SubjectsDataService } from 'src/app/service/subject.service';

@Component({
  selector: 'app-order-food',
  templateUrl: './order-food.component.html',
  styleUrls: []
})
export class OrderFoodComponent implements OnInit, OnDestroy{
  @Input() temp = '' as string;
  @Input() storageId = -1;
  private ngUnsubscribe = new Subject();

  selectedFood!: FoodModel;
  provider!: StoreModel;

  orderForm = new FormGroup({
    foodId: new FormControl('', [Validators.required]),
    providerId: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),    
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
        this.orderForm.controls.foodId.setValue(food.id);
        this.provider = {} as StoreModel;
      }
      document.getElementById('closeFoodArea')?.click();
    });

    this.subjects.subject(3)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((provider: StoreModel) => {
      this.provider = provider;
      this.orderForm.controls.providerId.setValue(provider.id);
      if(provider.userId !== this.sharedService.user.id){
        this.sharedService;
      }
      document.getElementById('closeProviderArea')?.click();
    });
  }

  createOrder = () => {
    if (this.validate()) {      
      const request = {
        foodId: this.orderForm.controls.foodId.value,
        quantity: this.orderForm.controls.quantity.value,
        price: this.orderForm.controls.price.value,
        providerId: this.orderForm.controls.providerId.value,
        storageId: this.storageId,
      } as any;
      this.sharedService.createOrder(request, this.storageId);
      
    }
  }  

  selectFood = (foodArea: any) => {
    this.modalService.open(foodArea, { size: 'xl', scrollable: true });
  }

  validate = () => {
    if (this.orderForm.invalid) {
      if(this.orderForm.controls.foodId.invalid){
        this.sharedService.warningToast('Invalid food');    
      }
      if(this.orderForm.controls.providerId.invalid){
        this.sharedService.warningToast('Invalid provider');    
      }
      if(this.orderForm.controls.price.invalid){
        this.sharedService.warningToast('Invalid price');    
      }
      if(this.orderForm.controls.quantity.invalid){
        if(this.selectedFood.isPacked){
          this.sharedService.warningToast('Invalid quantity');   
        } else {
          this.sharedService.warningToast('Invalid weight');   
        }
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
