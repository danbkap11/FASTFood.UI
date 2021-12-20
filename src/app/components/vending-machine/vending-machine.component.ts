import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CellModel } from 'src/app/models/cell';
import { StoreModel } from 'src/app/models/store';
import { SharedService } from 'src/app/service/shared.service';
import { SubjectsDataService } from 'src/app/service/subject.service';

@Component({
  selector: 'app-vending-machine',
  templateUrl: './vending-machine.component.html',
  styles: [
  ],
})
export class VendingMachineComponent implements OnInit, OnDestroy{
  private ngUnsubscribe = new Subject();
  @Input() vendingMachine = {} as StoreModel;
  
  selectedCell = {} as CellModel;

  constructor(
    public sharedService: SharedService,
    public formBuilder: FormBuilder,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private subjects: SubjectsDataService
  ) { }

  ngOnInit(): void {
    this.subjects.subject(5)
    .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((cell) => {
        this.selectedCell = JSON.parse(cell);
        const index = this.vendingMachine.cellList.findIndex(c => c.id === this.selectedCell.id);
        this.vendingMachine.cellList[index] = this.selectedCell;
        document.getElementById('closeCellArea')?.click();
      });

      this.subjects.subject(6)
      .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(() => {
          document.getElementById('closeUpdateVendingMachineArea')?.click();
        });
  }

  createCell = () => {
    const request = {
      id: this.vendingMachine.id
    } as any;
    this.sharedService.createEmptyCell(request);
  }

  
  updateCell = (content: any, cell: CellModel) => {
    this.selectedCell = cell;
    this.modalService.open(content, { scrollable: true });
  }

  updateVendingMachine = (content: any) => {
    this.modalService.open(content, { scrollable: true });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
