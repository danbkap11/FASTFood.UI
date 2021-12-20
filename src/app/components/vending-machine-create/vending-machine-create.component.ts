import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StoreModel } from 'src/app/models/store';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-vending-machine-create',
  templateUrl: './vending-machine-create.component.html',
  styles: [
  ],
})
export class VendingMachineCreateComponent implements OnInit {
  @Input() shop = {} as StoreModel;
  @Input() role = 'Vending Machine' as string;

  isShop = this.sharedService.isShop;
  regForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    location: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  constructor(
    private sharedService: SharedService,
    public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    if (this.shop.id) {
      this.regForm.controls.name.setValue(this.shop.name);      
      this.regForm.controls.location.setValue(this.shop.location);     
    }
    if(!this.isShop){
      this.role = "Warehouse"
    }
  }
  
  createMachine = () => {
    if (this.validate()) {
      const request = {
        location: this.regForm.controls.location.value,
        name: this.regForm.controls.name.value,
      } as StoreModel;
      if(this.role === 'Vending Machine'){
        this.sharedService.registerMachine(request);
      }
      if(this.role === 'Shop' || this.role === "Warehouse"){
        
        this.sharedService.registerStore(request);

      }
    }
  }

  updateMachine = () => {
    if (this.validate()) {
      const request = {
        id: this.shop.id,
        location: this.regForm.controls.location.value,
        name: this.regForm.controls.name.value,
      } as StoreModel;
      if(this.role === 'Vending Machine'){
        this.sharedService.updateMachine(request);
      }
      if(this.role === 'Shop'|| this.role === "Warehouse"){
        this.sharedService.updateStoreInfo(request);
      }
    }
  }

  validate = () => {
    if (this.regForm.invalid) {
      if(this.regForm.controls.name.invalid){
        this.sharedService.warningToast('Name must be at least 5 symbols');
      }
      if(this.regForm.controls.location.invalid){
        this.sharedService.warningToast('Location must be at least 4 symbols');    
      }
      return false;
    }    
    return true;
  }
}
