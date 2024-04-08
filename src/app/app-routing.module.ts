import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './modules/shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../app/modules/pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'electronics',
    loadChildren: () => import('./modules/pages/electronics/electronics.module').then(m => m.ElectronicsModule)
  },
  {
    path: 'jewelry',
    loadChildren: () => import('./modules/pages/jewelry/jewelry.module').then(m => m.JewelryModule)
  },
  {
    path: 'men-clothing',
    loadChildren: () => import('./modules/pages/men-clothing/men-clothing.module').then(m => m.MenClothingModule)
  },
  {
    path: 'women-clothing',
    loadChildren: () => import('./modules/pages/women-clothing/women-clothing.module').then(m => m.WomenClothingModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./modules/pages/orders/orders.module').then(m => m.OrdersModule),
    canActivate: [authGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./modules/pages/profile/profile.module').then(m => m.ProfileModule),
    canActivate: [authGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./modules/pages/products/products.module').then(m => m.ProductsModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./modules/pages/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./modules/pages/cart/cart.module').then(m => m.CartModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./modules/pages/payment/payment.module').then(m => m.PaymentModule)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
