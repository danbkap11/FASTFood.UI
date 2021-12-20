import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedApiService } from '../service/shared-api.service';
import { SharedService } from '../service/shared.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private apiService: SharedApiService,
    protected sharedService: SharedService,
    private router: Router
  ) {}
     
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Promise<boolean>{
    const result = await this.apiService.getAdmin().toPromise()
    .then(req => {
      if (req.status) {
        this.sharedService.isLogin = true;
        this.sharedService.isAdmin = true;
        this.sharedService.activePage='Admin';
        return true;
      } else {
        this.sharedService.erorrToast(req.returnInfo);
        this.sharedService.isAdmin = false;
        this.sharedService.isLogin = false;
        
        this.router.navigate(['/login']);
        return false;
      }
    })
    .catch(err => {
      console.log(err);
      this.sharedService.erorrToast('Server error');
      this.sharedService.isAdmin = false;
      this.sharedService.isLogin = false;
      
      this.router.navigate(['/login']);
      return false;
    });
    return result;
  }
}
