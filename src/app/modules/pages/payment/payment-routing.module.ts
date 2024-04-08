import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentPageComponent } from './payment-page/payment-page.component';
import { authGuard } from '../../shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: PaymentPageComponent,
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
