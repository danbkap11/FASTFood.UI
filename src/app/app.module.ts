import { ElementRef, NgModule, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegistrationComponent } from './components/registration/registration.component';
import { ToastsComponent } from './components/toasts/toasts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { CookieService } from 'ngx-cookie-service';
import { WareHouseComponent } from './components/ware-house/ware-house.component';
import { ShopsComponent } from './components/shops/shops.component';
import { WareHousesComponent } from './components/ware-houses/ware-houses.component';
import { VendingMachinesComponent } from './components/vending-machines/vending-machines.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSelectModule} from '@angular/material/select';
import { VendingMachineComponent } from './components/vending-machine/vending-machine.component';
import { CellComponent } from './components/cell/cell.component';
import { FoodComponent } from './components/food/food.component';
import { ProvidersOfFoodComponent } from './components/providers-of-food/providers-of-food.component';
import { VendingMachineCreateComponent } from './components/vending-machine-create/vending-machine-create.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { ShopComponent } from './components/shop/shop.component';
import { StorageComponent } from './components/storage/storage.component';
import { StorageModifyComponent } from './components/storage-modify/storage-modify.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { OrderFoodComponent } from './components/order-food/order-food.component';
import { OrdersComponent } from './components/orders/orders.component';
import { MatTabsModule } from '@angular/material/tabs';
import { PutFoodComponent } from './components/put-food/put-food.component';
import { SetFoodInStorageComponent } from './components/set-food-in-storage/set-food-in-storage.component';
import { ProvidesFoodComponent } from './components/provides-food/provides-food.component';
import { ShowFoodComponent } from './components/show-food/show-food.component';
import { CreateFoodComponent } from './components/create-food/create-food.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TopBarComponent,
    RegistrationComponent,
    ToastsComponent,
    HomeComponent,
    WareHouseComponent,
    ShopsComponent,
    WareHousesComponent,
    VendingMachinesComponent,
    VendingMachineComponent,
    CellComponent,
    FoodComponent,
    ProvidersOfFoodComponent,
    VendingMachineCreateComponent,
    AdminPanelComponent,
    ShopComponent,
    StorageComponent,
    StorageModifyComponent,
    OrderFoodComponent,
    OrdersComponent,
    PutFoodComponent,
    SetFoodInStorageComponent,
    ProvidesFoodComponent,
    ShowFoodComponent,
    CreateFoodComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatProgressBarModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatSlideToggleModule 
  ],
  providers: [
    CookieService, 
    NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
