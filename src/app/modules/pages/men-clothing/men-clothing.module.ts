import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenClothingRoutingModule } from './men-clothing-routing.module';
import { MenClothingPageComponent } from './men-clothing-page/men-clothing-page.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    MenClothingPageComponent
  ],
  imports: [
    CommonModule,
    MenClothingRoutingModule,
    SharedModule
  ]
})
export class MenClothingModule { }
