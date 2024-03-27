import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JewelryRoutingModule } from './jewelry-routing.module';
import { JewelryPageComponent } from './jewelry-page/jewelry-page.component';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../material/material.module';


@NgModule({
  declarations: [
    JewelryPageComponent
  ],
  imports: [
    CommonModule,
    JewelryRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class JewelryModule { }
