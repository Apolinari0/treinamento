import { Routes } from '@angular/router';
import { SellerComponent } from './features/seller/seller.component';

export const routes: Routes = [
  { path: 'seller', component: SellerComponent },
  { path: '', redirectTo: 'seller', pathMatch: 'full' }
];
