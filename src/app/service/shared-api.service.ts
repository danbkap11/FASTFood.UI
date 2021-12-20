import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedApiService  {
  baseURL = 'http://localhost:8080/';
  token = 'token';

  constructor(private http: HttpClient,
    private cookieService: CookieService) { }
  
  
  login(request: any): Observable<any> {
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');

    return this.http.post(this.baseURL + 'login', request, {headers});
  }

  registerUser(request: any): Observable<any> {
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
    
    return this.http.post(this.baseURL + 'registerUser', request, {headers});
  }

  changePassword(request: any): Observable<any> {
    let headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + this.cookieService.get(this.token));
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseURL + 'changePassword', request, {headers});
  }
  changeUserInfo(request: any): Observable<any> {
    let headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + this.cookieService.get(this.token));
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseURL + 'changeUserInfo', request, {headers});
  }

  getUser = (): Observable<any> =>{
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + this.cookieService.get(this.token));
    
    return this.http.get(this.baseURL + 'getUser', {headers});
  }

  getAdmin = (): Observable<any> =>{
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + this.cookieService.get(this.token)); 
    return this.http.get(this.baseURL + 'isAdmin', {headers});
  }

  getMachines = (): Observable<any> =>{
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + this.cookieService.get(this.token));
    
    return this.http.get(this.baseURL + 'getMachines', {headers});
  }

  getUserRole = (): Observable<any> =>{
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + this.cookieService.get(this.token));
    
    return this.http.get(this.baseURL + 'getUserRole', {headers});
  }

  createEmptyCell = (request: any): Observable<any> =>{
    let headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + this.cookieService.get(this.token));
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseURL + 'createEmptyCell', request, {headers});
  }

  getFoodList = (): Observable<any> =>{
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + this.cookieService.get(this.token));
    
    return this.http.get(this.baseURL + 'getFoodList', {headers});
  }

  getProvidersOfFood(request: any): Observable<any> {
    let headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + this.cookieService.get(this.token));
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseURL + 'getProvidersOfFood', request, {headers});
  }

  updateCellInfo = (request: any): Observable<any> =>{
    let headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + this.cookieService.get(this.token));
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseURL + 'updateCellInfo', request, {headers});
  }
  
  cellToEmpty = (request: any): Observable<any> =>{
    let headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + this.cookieService.get(this.token));
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseURL + 'cellToEmpty', request, {headers});
  }

  registerMachine = (request: any): Observable<any> =>{
    let headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + this.cookieService.get(this.token));
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseURL + 'registerMachine', request, {headers});
  }

  updateMachine = (request: any): Observable<any> =>{
    let headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + this.cookieService.get(this.token));
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseURL + 'updateMachine', request, {headers});
  }

  getStores = (): Observable<any> =>{
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + this.cookieService.get(this.token));
    return this.http.get(this.baseURL + 'getStores', {headers});
  }

  backupAdmin = (): Observable<any> =>{
    const headers =  new HttpHeaders({
      'Accept': 'text/html, application/xhtml+xml, */*',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.cookieService.get(this.token)
  })

    return this.http.get(this.baseURL + 'backupAdmin', {headers, responseType:'text'});
  }

  registerStore = (request: any): Observable<any> =>{
    let headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + this.cookieService.get(this.token));
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseURL + 'registerStore', request, {headers});
  }

  updateStoreInfo = (request: any): Observable<any> =>{
    let headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + this.cookieService.get(this.token));
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseURL + 'updateStoreInfo', request, {headers});
  }

  registerProvider = (request: any): Observable<any> =>{
    let headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + this.cookieService.get(this.token));
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseURL + 'registerProvider', request, {headers});
  }

  updateProvider = (request: any): Observable<any> =>{
    let headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + this.cookieService.get(this.token));
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseURL + 'updateProvider', request, {headers});
  }

  createStorage = (request: any): Observable<any> =>{
    let headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + this.cookieService.get(this.token));
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseURL + 'createStorage', request, {headers});
  }

  updateStorage = (request: any): Observable<any> =>{
    let headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + this.cookieService.get(this.token));
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseURL + 'updateStorage', request, {headers});
  }

  finishOrder = (request: any): Observable<any> =>{
    let headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + this.cookieService.get(this.token));
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseURL + 'finishOrder', request, {headers});
  }

  createOrder = (request: any): Observable<any> =>{
    let headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + this.cookieService.get(this.token));
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseURL + 'createOrder', request, {headers});
  }

  cancelOrder = (request: any): Observable<any> =>{
    let headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + this.cookieService.get(this.token));
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseURL + 'cancelOrder', request, {headers});
  }

  putFoodToStorage = (request: any): Observable<any> =>{
    let headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + this.cookieService.get(this.token));
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseURL + 'putFoodToStorage', request, {headers});
  }

  clearStorage = (request: any): Observable<any> =>{
    let headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + this.cookieService.get(this.token));
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseURL + 'clearStorage', request, {headers});
  }

  getProviders = (): Observable<any> =>{
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + this.cookieService.get(this.token));
    return this.http.get(this.baseURL + 'getProviders', {headers});
  }

  inProgressOrder = (request: any): Observable<any> =>{
    let headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + this.cookieService.get(this.token));
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseURL + 'inProgressOrder', request, {headers});
  } 

  getFoodThatProvide = (): Observable<any> =>{
    let headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + this.cookieService.get(this.token));
    headers = headers.append('Content-Type', 'application/json');
    return this.http.get(this.baseURL + 'getFoodThatProvide', {headers});
  } 

  createFood = (request: any): Observable<any> =>{
    let headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + this.cookieService.get(this.token));
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseURL + 'createFood', request, {headers});
  } 

}
