import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FoodModel } from '../models/food';
import { StorageModel, StoreModel } from '../models/store';
import { ToastModel } from '../models/toast';
import { UserModel } from '../models/userModels';
import { SharedApiService } from './shared-api.service';
import { SubjectsDataService } from './subject.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  user = {} as UserModel;
  vendingMachines = [] as StoreModel[];
  providersOfFood = [] as StoreModel[];
  shops = [] as StoreModel[];
  isLogin = false;
  isAdmin = false;
  foodList = {} as FoodModel[];
  activePage = 'Login';
  isShop=true;

  token = 'token';

  constructor(private apiService: SharedApiService,
    private subjects: SubjectsDataService,
    private route:Router,
    private cookieService: CookieService) { }

  tryLogin = (request: any) => {
    this.apiService.login(request).toPromise()
    .then(req => {
      if (req.status) {
        this.successToast(req.returnInfo)
        this.cookieService.set( 'token', req.token );
        this.isLogin = true;
        this.isAdmin = req.isAdmin;
        if(this.isAdmin){
          this.route.navigate(['/food']);
        } else {
          this.route.navigate(['/home']);
        }
        
      } else {
        this.erorrToast(req.returnInfo);
      }
    })
    .catch(err => {
      console.log(err);
      this.erorrToast('Server error')
      return false;
    });
  }

  tryRegister = (request: any) => {
    this.apiService.registerUser(request).toPromise()
    .then(req => {
      if (req.status) {
        this.successToast(req.returnInfo)
        this.cookieService.set( 'token', req.token );
        this.isLogin = true;
        this.route.navigate(['/home']);
      } else {
        this.erorrToast(req.returnInfo);
      }
    })
    .catch(err => {
      console.log(err);
      this.successToast('Server error')
      return false;
    });
  }

  changePassword = (request: any) => {
    this.apiService.changePassword(request).toPromise()
    .then(req => {
      if (req.status) {
        this.successToast(req.returnInfo);
      } else {
        this.erorrToast(req.returnInfo);
      }
    })
    .catch(err => {
      console.log(err);
      this.erorrToast('Server error')
      return false;
    });
  }

  changeUserInfo = (request: any) => {
    this.apiService.changeUserInfo(request).toPromise()
    .then(req => {
      if (req.status) {
        this.successToast(req.returnInfo);
        this.user = JSON.parse(req.user);
      } else {
        this.erorrToast(req.returnInfo);
      }
    })
    .catch(err => {
      console.log(err);
      this.erorrToast('Server error')
      return false;
    });
  }
  createEmptyCell = (request: any) => {
    this.apiService.createEmptyCell(request).toPromise()
    .then(req => {
      if (req.status) {
        this.successToast(req.returnInfo)
        const cell = JSON.parse(req.cell);
        this.vendingMachines.find(vm => vm.id === cell.storeId)?.cellList.push(cell);
      } else {
        this.erorrToast(req.returnInfo);
      }
    })
    .catch(err => {
      console.log(err);
      this.erorrToast('Server error')
      return false;
    });
  }
  getProvidersOfFood = (request: any) => {
    this.apiService.getProvidersOfFood(request).toPromise()
    .then(req => {
      if (req.status) {
        this.providersOfFood = JSON.parse(req.providersList);
        this.subjects.subject(4).next();
      } else {
        this.erorrToast(req.returnInfo);
      }
    })
    .catch(err => {
      console.log(err);
      this.erorrToast('Server error');
    });
  }

  updateCellInfo = (request: any) => {
    this.apiService.updateCellInfo(request).toPromise()
    .then(req => {
      if (req.status) {
        this.subjects.subject(5).next(req.cell);
      } else {
        this.erorrToast(req.returnInfo);
      }
    })
    .catch(err => {
      console.log(err);
      this.erorrToast('Server error');
    });
  }

  cellToEmpty = (request: any) => {
    this.apiService.cellToEmpty(request).toPromise()
    .then(req => {
      if (req.status) {
        this.subjects.subject(5).next(req.cell);
      } else {
        this.erorrToast(req.returnInfo);
      }
    })
    .catch(err => {
      console.log(err);
      this.erorrToast('Server error');
    });
  }

  registerMachine = (request: any) => {
    this.apiService.registerMachine(request).toPromise()
    .then(req => {
      if (req.status) {
        this.successToast(req.returnInfo);
        this.vendingMachines = JSON.parse(req.machines);
        this.subjects.subject(6).next();

      } else {
        this.erorrToast(req.returnInfo);
      }
    })
    .catch(err => {
      console.log(err);
      this.erorrToast('Server error');
    });
  }

  updateMachine = (request: any) => {
    this.apiService.updateMachine(request).toPromise()
    .then(req => {
      if (req.status) {
        this.successToast(req.returnInfo);
        const vendingMachines = JSON.parse(req.machines);
        this.vendingMachines = vendingMachines;
        this.subjects.subject(6).next();
      } else {
        this.erorrToast(req.returnInfo);
      }
    })
    .catch(err => {
      console.log(err);
      this.erorrToast('Server error');
    });
  }

  registerStore = (request: any) => {

    if(this.isShop){
      this.apiService.registerStore(request).toPromise()
      .then(req => {
        if (req.status) {
          this.successToast(req.returnInfo);
          this.shops = JSON.parse(req.shops);
          this.subjects.subject(6).next();
  
        } else {
          this.erorrToast(req.returnInfo);
        }
      })
      .catch(err => {
        console.log(err);
        this.erorrToast('Server error');
      });
    } else {
      this.apiService.registerProvider(request).toPromise()
      .then(req => {
        if (req.status) {
          this.successToast(req.returnInfo);
          this.shops = JSON.parse(req.shops);
          this.subjects.subject(6).next();
  
        } else {
          this.erorrToast(req.returnInfo);
        }
      })
      .catch(err => {
        console.log(err);
        this.erorrToast('Server error');
      });
    }
  }

  updateStoreInfo = (request: any) => {
    if(this.isShop){
      this.apiService.updateStoreInfo(request).toPromise()
      .then(req => {
        if (req.status) {
          this.successToast(req.returnInfo);
          this.shops = JSON.parse(req.shops);
          this.subjects.subject(6).next();
        } else {
          this.erorrToast(req.returnInfo);
        }
      })
      .catch(err => {
        console.log(err);
        this.erorrToast('Server error');
      });
    } else {
      this.apiService.updateProvider(request).toPromise()
      .then(req => {
        if (req.status) {
          this.successToast(req.returnInfo);
          this.shops = JSON.parse(req.shops);
          this.subjects.subject(6).next();
        } else {
          this.erorrToast(req.returnInfo);
        }
      })
      .catch(err => {
        console.log(err);
        this.erorrToast('Server error');
      });
    }
  }

  createStorage = (request: any, selectedShopId: number) => {
    this.apiService.createStorage(request).toPromise()
    .then(req => {
      if (req.status) {
        this.successToast(req.returnInfo);
        const index = this.shops.findIndex(s => s.id === selectedShopId);
        this.shops[index].storageList = JSON.parse(req.storageList)
        this.subjects.subject(7).next();

      } else {
        this.erorrToast(req.returnInfo);
      }
    })
    .catch(err => {
      console.log(err);
      this.erorrToast('Server error');
    });
  }

  updateStorage = (request: any, selectedShopId: number) => {
    this.apiService.updateStorage(request).toPromise()
    .then(req => {
      if (req.status) {
        this.successToast(req.returnInfo);
        const index = this.shops.findIndex(s => s.id === selectedShopId);
        this.shops[index].storageList = JSON.parse(req.storageList)
        this.subjects.subject(7).next(this.shops[index].storageList.find(sl => sl.id === request.id));
      } else {
        this.erorrToast(req.returnInfo);
      }
    })
    .catch(err => {
      console.log(err);
      this.erorrToast('Server error');
    });
  }

  finishOrder = (request: any) => {
    this.apiService.finishOrder(request).toPromise()
    .then(req => {
      if (req.status) {

        this.successToast(req.returnInfo);
        this.shops = JSON.parse(req.shops);
        this.subjects.subject(9).next();
      } else {
        this.erorrToast(req.returnInfo);
      }
    })
    .catch(err => {
      console.log(err);
      this.erorrToast('Server error');
    });
  }

  cancelOrder = (request: any) => {
    this.apiService.cancelOrder(request).toPromise()
    .then(req => {
      if (req.status) {

        this.successToast(req.returnInfo);
        this.shops = JSON.parse(req.shops);
        this.subjects.subject(9).next();
      } else {
        this.erorrToast(req.returnInfo);
      }
    })
    .catch(err => {
      console.log(err);
      this.erorrToast('Server error');
    });
  }

  inProgressOrder = (request: any) => {
    this.apiService.inProgressOrder(request).toPromise()
    .then(req => {
      if (req.status) {
        this.successToast(req.returnInfo);
        this.shops = JSON.parse(req.shops);
        this.subjects.subject(9).next();
      } else {
        this.erorrToast(req.returnInfo);
      }
    })
    .catch(err => {
      console.log(err);
      this.erorrToast('Server error');
    });
  }

  createOrder = (request: any, selectedStorageId: number) => {
    this.apiService.createOrder(request).toPromise()
    .then(req => {
      if (req.status) {
        const index = this.shops.findIndex(s => s.storageList.findIndex(sl => sl.id ===selectedStorageId) !== -1);
        this.shops[index].storageList = JSON.parse(req.storageList);
        this.successToast(req.returnInfo);
        this.subjects.subject(8).next(this.shops[index].storageList.find(sl => sl.id === selectedStorageId));
      } else {
        this.erorrToast(req.returnInfo);
      }
    })
    .catch(err => {
      console.log(err);
      this.erorrToast('Server error');
    });
  }

  putFoodToStorage = (request: any) => {
    this.apiService.putFoodToStorage(request).toPromise()
    .then(req => {
      if (req.status) {
        this.successToast(req.returnInfo);
        this.shops = JSON.parse(req.shops);
        this.subjects.subject(9).next();
      } else {
        this.erorrToast(req.returnInfo);
      }
    })
    .catch(err => {
      console.log(err);
      this.erorrToast('Server error');
    });
  }

  clearStorage = (request: any) => {
    this.apiService.clearStorage(request).toPromise()
    .then(req => {
      if (req.status) {
        this.successToast(req.returnInfo);
        this.shops = JSON.parse(req.shops);
        this.subjects.subject(9).next();
      } else {
        this.erorrToast(req.returnInfo);
      }
    })
    .catch(err => {
      console.log(err);
      this.erorrToast('Server error');
    });
  }

  createFood = (request: any) => {
    this.apiService.createFood(request).toPromise()
    .then(req => {
      if (req.status) {
        this.successToast(req.returnInfo);
        this.foodList = JSON.parse(req.foodList);
        this.subjects.subject(11).next();
      } else {
        this.erorrToast(req.returnInfo);
      }
    })
    .catch(err => {
      console.log(err);
      this.erorrToast('Server error');
    });
  }



  logout = () => {
    this.isLogin = false;  
    this.isAdmin = false; 
    this.warningToast("You have Logout");
    this.cookieService.set( 'token', '' );
    this.route.navigate(['/login']);
  }




  erorrToast=(text: string)=>{
    const toast = {
      text,
      className: 'bg-danger text-light',
      delay: 2000
    } as ToastModel;
    this.subjects.subject(1).next(toast);
  }
  warningToast=(text: string)=>{
    const toast = {
      text,
      className: 'bg-warning text-light',
      delay: 2000
    } as ToastModel;
    this.subjects.subject(1).next(toast);
  }
  successToast=(text: string)=>{
    const toast = {
      text,
      className: 'bg-success text-light',
      delay: 2000
    } as ToastModel;
    this.subjects.subject(1).next(toast);
  }

  culcFullness=(store: StoreModel)=>{
    
    for (let storage of store.storageList) {
      let busy = 0.0;
      for (const foodInStorage of storage.foodInStorageModelList) {
        if(foodInStorage.status === 'READY'){
          busy += foodInStorage.quantity * foodInStorage.food.occupiedSpace;
        }
      }
      storage.fullness = busy;
    }
  }
}
