import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElectronicsRoutingModule } from './electronics-routing.module';
import { ElectronicsPageComponent } from './electronics-page/electronics-page.component';


@NgModule({
  declarations: [
    ElectronicsPageComponent
  ],
  imports: [
    CommonModule,
    ElectronicsRoutingModule
  ]
})
export class ElectronicsModule { }
