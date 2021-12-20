import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-create-food',
  templateUrl: './create-food.component.html',
  styleUrls: []
})
export class CreateFoodComponent implements OnInit {

  selectedTemp = 1;
  checked = false;

  regForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    description: new FormControl(''),
    occupiedSpace: new FormControl('', Validators.required)
  });

  constructor(
    private sharedService: SharedService,
    public formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }
  
  createFood = () => {
    if (this.validate()) {
        const request = {
          occupiedSpace: this.regForm.controls.occupiedSpace.value,
          name: this.regForm.controls.name.value,
          description: this.regForm.controls.description.value,
          isPacked: this.checked,
          tempId: this.selectedTemp,
        }
        this.sharedService.createFood(request);
    }
  }

  validate = () => {
    if (this.regForm.invalid) {
      if(this.regForm.controls.name.invalid){
        this.sharedService.warningToast('Name must be at least 2 symbols');
      }
      if(this.regForm.controls.occupiedSpace.invalid){
        this.sharedService.warningToast('Set occupiedSpace');
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
