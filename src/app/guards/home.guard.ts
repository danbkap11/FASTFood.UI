import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Resolve, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { ToastModel } from '../models/toast';
import { SharedApiService } from '../service/shared-api.service';
import { SharedService } from '../service/shared.service';
import { SubjectsDataService } from '../service/subject.service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard  implements Resolve<boolean> {

  constructor(
    private apiService: SharedApiService,
    protected sharedService: SharedService,
  ) {}
   
  async resolve(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot): Promise<boolean> {

      const result = await this.apiService.getUser().toPromise()
      .then(req => {
        if (req.status) {
          this.sharedService.user = JSON.parse(req.user);
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
      return result;
  }  
}
