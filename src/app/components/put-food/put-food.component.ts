import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FoodInStorageModel, FoodModel } from 'src/app/models/food';
import { SharedService } from 'src/app/service/shared.service';
import { SubjectsDataService } from 'src/app/service/subject.service';

@Component({
  selector: 'app-put-food',
  templateUrl: './put-food.component.html',
  styleUrls: []
})
export class PutFoodComponent implements OnInit, OnDestroy{
  private ngUnsubscribe = new Subject();
  @Input() temp = '' as string;
  @Input() foodInStorage = {} as FoodInStorageModel;
  @Input() storageId = -1;

  selectedFood!: FoodModel;

  regForm = new FormGroup({
    price: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
    shelfLife: new FormControl('',),
    foodId: new FormControl('')
  });
  datepipe: any;

  constructor(
    private sharedService: SharedService,
    public formBuilder: FormBuilder,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private subjects: SubjectsDataService) { }

  ngOnInit(): void {
    if (this.foodInStorage.id) {
      this.selectedFood = this.foodInStorage.food;
      this.regForm.controls.price.setValue(this.foodInStorage.price);      
      this.regForm.controls.quantity.setValue(this.foodInStorage.quantity);
      this.regForm.controls.shelfLife.setValue(this.foodInStorage.shelfLife);
      this.regForm.controls.foodId.setValue(this.foodInStorage.food.id);
    }
    this.subjects.subject(2)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((food: FoodModel) => {
      if(!this.selectedFood || food.id !== this.selectedFood.id){
        this.selectedFood = food;
        this.regForm.controls.foodId.setValue(food.id);
      }
      document.getElementById('closeFoodArea')?.click();
    });
  }

  selectFood = (foodArea: any) => {
    this.modalService.open(foodArea, { size: 'xl', scrollable: true });
  }
  
  putFood = () => {
      if (this.validate()) {
        let stra = this.regForm.controls.shelfLife.value.split('-')
        const shelfLife = stra[2] + '/' + stra[1] + '/' + stra[0];
        const request = {
          price: this.regForm.controls.price.value,
          quantity: this.regForm.controls.quantity.value,
          shelfLife: shelfLife,
          foodId: this.regForm.controls.foodId.value,
          storageId: this.storageId
        } as any;
        this.sharedService.putFoodToStorage(request);
      }
  }

  updateFoodInStorage = () =>{

  }

  validate = () => {
    if (this.regForm.invalid) {
      if(this.regForm.controls.price.invalid){
        this.sharedService.warningToast('Invalid price');
      }
      if(this.regForm.controls.quantity.invalid){
        if(this.selectedFood.isPacked){
          this.sharedService.warningToast('Invalid weight');
        } else{
          this.sharedService.warningToast('Invalid quantity');
        }
      }
      if(this.regForm.controls.shelfLife.invalid){
        this.sharedService.warningToast('Invalid shelflife');
      }
      return false;
    }    
    return true;
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
