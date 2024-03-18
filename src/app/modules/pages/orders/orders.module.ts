import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersPageComponent } from './orders-page/orders-page.component';
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    OrdersPageComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class OrdersModule { }
