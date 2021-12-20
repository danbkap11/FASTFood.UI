import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SharedService } from 'src/app/service/shared.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-ware-houses',
  templateUrl: './ware-houses.component.html',
  styles: [
  ],
})
export class WareHousesComponent implements OnInit {

  constructor(
    public toastService: ToastService,
    private sharedService: SharedService,
    public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.sharedService.activePage = "WareHouses";
  }

}
