import { Component, OnInit } from '@angular/core';
import { SharedApiService } from 'src/app/service/shared-api.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styles: [
  ],
})
export class AdminPanelComponent implements OnInit {

  constructor(
    private apiService: SharedApiService,
    protected sharedService: SharedService,
  ) { }

  ngOnInit(): void {
  }

  beckup = () => {
    this.apiService.backupAdmin().subscribe((response: any) =>{
        let dataType = 'sql';
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: '.sql'}));

        downloadLink.setAttribute('download', 'beckup_'+ new Date().toString() +'_.sql');
        document.body.appendChild(downloadLink);
        downloadLink.click();
    }), (error: any) =>  console.log('Error downloading the file');
  }
}
