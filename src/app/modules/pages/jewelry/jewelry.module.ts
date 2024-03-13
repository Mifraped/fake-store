import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JewelryRoutingModule } from './jewelry-routing.module';
import { JewelryPageComponent } from './jewelry-page/jewelry-page.component';


@NgModule({
  declarations: [
    JewelryPageComponent
  ],
  imports: [
    CommonModule,
    JewelryRoutingModule
  ]
})
export class JewelryModule { }
