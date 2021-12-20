import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProvidersOfFoodComponent } from './components/providers-of-food/providers-of-food.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ShopsComponent } from './components/shops/shops.component';
import { ShowFoodComponent } from './components/show-food/show-food.component';
import { VendingMachinesComponent } from './components/vending-machines/vending-machines.component';
import { WareHousesComponent } from './components/ware-houses/ware-houses.component';
import { AdminGuard } from './guards/admin.guard';
import { HomeGuard } from './guards/home.guard';
import { ShopsGuard } from './guards/shops.guard';
import { ShowFoodGuard } from './guards/show-food.guard';
import { UserGuard } from './guards/user.guard';
import { VendingMachinesGuard } from './guards/vending-machines.guard';
import { WareHousesGuard } from './guards/ware-houses.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'home', component: HomeComponent, canActivate: [UserGuard]},
  { path: 'warehouses', component: ShopsComponent, resolve: [WareHousesGuard], canActivate: [UserGuard]},
  { path: 'shops', component: ShopsComponent, resolve: [ShopsGuard], canActivate: [UserGuard]},
  { path: 'vending-machines', component: VendingMachinesComponent, resolve: [VendingMachinesGuard], canActivate: [UserGuard]},
  { path: 'food', component: ShowFoodComponent, resolve: [ShowFoodGuard], canActivate: [AdminGuard]},
  { path: 'admin', component: AdminPanelComponent, canActivate: [AdminGuard]},
  { path: '**', redirectTo: 'login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [HomeGuard, UserGuard, WareHousesGuard, ShopsGuard, VendingMachinesGuard],
})
export class AppRoutingModule { }
