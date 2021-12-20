import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StoreModel } from 'src/app/models/store';
import { SharedService } from 'src/app/service/shared.service';
import { SubjectsDataService } from 'src/app/service/subject.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-vending-machines',
  templateUrl: './vending-machines.component.html',
  styles: [
  ],
})
export class VendingMachinesComponent implements OnInit, OnDestroy{
  private ngUnsubscribe = new Subject();
  vendingMachines!: StoreModel[];
  selectedVendingMachine = {} as StoreModel;

  constructor(
    private sharedService: SharedService,
    public formBuilder: FormBuilder,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private subjects: SubjectsDataService) { }

  ngOnInit(): void {
    this.sharedService.activePage = "VendingMachines";
    this.vendingMachines = this.sharedService.vendingMachines;
    this.subjects.subject(6)
    .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.vendingMachines = this.sharedService.vendingMachines;
        const sv = this.sharedService.vendingMachines.find(v => v.id === this.selectedVendingMachine.id);
        this.selectedVendingMachine = sv!;
        document.getElementById('closeCreateVendingMachineArea')?.click();
      });
  }

  createVendingMachine = (content: any) => {
    this.modalService.open(content, { scrollable: true });    
  }

  openVendingMachine(openМendingMachine: any, vendingMachine: StoreModel) {
    this.selectedVendingMachine = vendingMachine;
    this.modalService.open(openМendingMachine, { size: 'xl', scrollable: true });
  }

  click() {
    this.modalService.dismissAll();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
