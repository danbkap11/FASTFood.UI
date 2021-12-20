import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { SharedApiService } from '../service/shared-api.service';
import { SharedService } from '../service/shared.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(
    private apiService: SharedApiService,
    protected sharedService: SharedService,
    private cookieService: CookieService,
    private router: Router
  ) {}
     
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Promise<boolean>{
    const result = await this.apiService.getUser().toPromise()
    .then(req => {
      if (req.status) {
        this.sharedService.user = JSON.parse(req.user);
        this.sharedService.isLogin = true;
        this.sharedService.activePage='Home';
        return true;
      } else {
        this.sharedService.erorrToast(req.returnInfo);
        this.sharedService.isLogin = false;
        this.router.navigate(['/login']);
        return false;
      }
    })
    .catch(err => {
      console.log(err);
      this.sharedService.isLogin = false;
      this.sharedService.erorrToast('Server error');
      this.router.navigate(['/login']);
      return false;
    });
    return result;
  }
  
}
