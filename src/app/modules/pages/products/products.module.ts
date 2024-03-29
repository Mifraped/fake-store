import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsPageComponent } from './products-page/products-page.component';
import { SingleProductPageComponent } from './single-product-page/single-product-page.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../material/material.module';
import { FormsModule } from '@angular/forms';
import { StarRatingModule } from 'angular-star-rating';


@NgModule({
  declarations: [
    ProductsPageComponent,
    SingleProductPageComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    RouterModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    StarRatingModule.forRoot()
  ]
})
export class ProductsModule { }
