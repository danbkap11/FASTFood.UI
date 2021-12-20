import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FoodModel } from 'src/app/models/food';
import { SharedService } from 'src/app/service/shared.service';
import { SubjectsDataService } from 'src/app/service/subject.service';

@Component({
  selector: 'app-show-food',
  templateUrl: './show-food.component.html',
  styleUrls: []
})
export class ShowFoodComponent implements OnInit, OnDestroy{
  private ngUnsubscribe = new Subject();

  constructor(
    private sharedService: SharedService,
    public formBuilder: FormBuilder,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private subjects: SubjectsDataService) { }
    foodList = [] as FoodModel[];

  ngOnInit(): void {
    this.sharedService.activePage = "Food";
    this.foodList = this.sharedService.foodList;

  
    this.subjects.subject(11)
    .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.foodList = this.sharedService.foodList;
        document.getElementById('closecreateFoodArea')?.click();
      });
  }

  createFood = (content: any) => {
    this.modalService.open(content, { scrollable: true });    
  }


  click() {
    this.modalService.dismissAll();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
