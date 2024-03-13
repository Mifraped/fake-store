import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WomenClothingPageComponent } from './women-clothing-page/women-clothing-page.component';

const routes: Routes = [
  {
    path: '',
    component: WomenClothingPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WomenClothingRoutingModule { }
