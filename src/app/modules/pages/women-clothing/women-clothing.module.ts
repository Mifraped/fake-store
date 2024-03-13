import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WomenClothingRoutingModule } from './women-clothing-routing.module';
import { WomenClothingPageComponent } from './women-clothing-page/women-clothing-page.component';


@NgModule({
  declarations: [
    WomenClothingPageComponent
  ],
  imports: [
    CommonModule,
    WomenClothingRoutingModule
  ]
})
export class WomenClothingModule { }
