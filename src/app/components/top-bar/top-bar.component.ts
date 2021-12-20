import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styles: [
  ],
})
export class TopBarComponent implements OnInit {


  constructor(public sharedService: SharedService,) { }

  ngOnInit(): void {
  }

  logout = () => {
    this.sharedService.logout();
  }

}
