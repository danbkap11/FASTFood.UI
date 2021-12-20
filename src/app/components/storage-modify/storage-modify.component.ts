import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageModel } from 'src/app/models/store';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-storage-modify',
  templateUrl: './storage-modify.component.html',
  styleUrls: []
})
export class StorageModifyComponent implements OnInit {
  @Input() storage = {} as StorageModel;
  @Input() role = 'Vending Machine' as string;
  @Input() storeId = -1;

  selectedTemp = 1;

  regForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    description: new FormControl(''),
    capacity: new FormControl('', Validators.required)
  });

  constructor(
    private sharedService: SharedService,
    public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    if (this.storage.id) {
      this.regForm.controls.name.setValue(this.storage.name);      
      this.regForm.controls.description.setValue(this.storage.description);
      this.selectedTemp = this.storage.tempId;
      this.regForm.controls.capacity.setValue(this.storage.capacity);
    }
  }
  
  createStorage = () => {
    if (this.validate()) {
      if(this.selectedTemp !== this.storage.tempId && this.storage.foodInStorageModelList && this.storage.foodInStorageModelList.length !== 0){
        this.sharedService.warningToast('Clear storage before change temp');
      } else {
        const request = {
          storeId: this.storeId,
          name: this.regForm.controls.name.value,
          description: this.regForm.controls.description.value,
          tempId: this.selectedTemp,
          capacity: this.regForm.controls.capacity.value,
        } as StorageModel;
        this.sharedService.createStorage(request, this.storeId);
      }
    }
  }

  updateStorage = () => {
    if (this.validate()) {
      const request = {
        id: this.storage.id,
        name: this.regForm.controls.name.value,
        description: this.regForm.controls.description.value,
        tempId: this.regForm.controls.tempId.value,
      } as StorageModel;
      this.sharedService.updateStorage(request, this.storeId);
    }
  }

  validate = () => {
    if (this.regForm.invalid) {
      if(this.regForm.controls.name.invalid){
        this.sharedService.warningToast('Name must be at least 4 symbols');
      }
      if(this.regForm.controls.capacity.invalid){
        this.sharedService.warningToast('Set capacity');
      }
      return false;
    }    
    return true;
  }

  temps: any[] = [
    {id: 1, viewValue: 'NORMAL(4 - 25)'},
    {id: 2, viewValue: 'COLD(-1 - 3)'},
    {id: 3, viewValue: 'FREEZ(-4 - -10)'}
  ];
}
