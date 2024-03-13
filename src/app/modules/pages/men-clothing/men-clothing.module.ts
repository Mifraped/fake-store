import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenClothingRoutingModule } from './men-clothing-routing.module';
import { MenClothingPageComponent } from './men-clothing-page/men-clothing-page.component';


@NgModule({
  declarations: [
    MenClothingPageComponent
  ],
  imports: [
    CommonModule,
    MenClothingRoutingModule
  ]
})
export class MenClothingModule { }
