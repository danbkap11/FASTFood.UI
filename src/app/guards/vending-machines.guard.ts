import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Resolve, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedApiService } from '../service/shared-api.service';
import { SharedService } from '../service/shared.service';

@Injectable({
  providedIn: 'root'
})

export class VendingMachinesGuard implements Resolve<boolean> {
  constructor(
    private apiService: SharedApiService,
    protected sharedService: SharedService,
  ) {}
   
  
  async resolve(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot): Promise<boolean> {

      let result = await this.apiService.getMachines().toPromise()
      .then(req => {
        if (req.status) {
          this.sharedService.vendingMachines = JSON.parse(req.machines);
          return true;
        } else {
          this.sharedService.erorrToast(req.returnInfo);
          return false;
        }
      })
      .catch(err => {
        console.log(err);
        this.sharedService.erorrToast('Server error');
        return false;
      });
      if(result){
        result = await this.apiService.getFoodList().toPromise()
        .then(req => {
          if (req.status) {
            this.sharedService.foodList = JSON.parse(req.foodList);
            return true;
          } else {
            this.sharedService.erorrToast(req.returnInfo);
            return false;
          }
        })
        .catch(err => {
          console.log(err);
          this.sharedService.erorrToast('Server error');
          return false;
        });
      }
      return result;
  }

}