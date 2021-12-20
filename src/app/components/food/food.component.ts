import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FoodModel } from 'src/app/models/food';
import { SharedService } from 'src/app/service/shared.service';
import { SubjectsDataService } from 'src/app/service/subject.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styles: [
  ],
})
export class FoodComponent implements OnInit {
  @Input() temp = '' as string;
  foodList = [] as FoodModel[];

  constructor(
    public sharedService: SharedService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private subjects: SubjectsDataService
  ) { }

  ngOnInit(): void {
    if(this.temp !==''){
      this.foodList = this.sharedService.foodList.filter(fl => fl.temp === this.temp);
    } else {
      this.foodList = this.sharedService.foodList;
    }
    
  }

  selectThis = (food: FoodModel) =>{
    this.subjects.subject(2).next(food);
  }
}
