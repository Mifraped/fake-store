import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElectronicsRoutingModule } from './electronics-routing.module';
import { ElectronicsPageComponent } from './electronics-page/electronics-page.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    ElectronicsPageComponent
  ],
  imports: [
    CommonModule,
    ElectronicsRoutingModule,
    SharedModule
  ]
})
export class ElectronicsModule { }
