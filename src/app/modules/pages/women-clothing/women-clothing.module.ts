import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WomenClothingRoutingModule } from './women-clothing-routing.module';
import { WomenClothingPageComponent } from './women-clothing-page/women-clothing-page.component';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../material/material.module';


@NgModule({
  declarations: [
    WomenClothingPageComponent
  ],
  imports: [
    CommonModule,
    WomenClothingRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class WomenClothingModule { }
