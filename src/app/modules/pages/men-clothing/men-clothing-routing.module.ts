import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenClothingPageComponent } from './men-clothing-page/men-clothing-page.component';

const routes: Routes = [
  {
    path: '',
    component: MenClothingPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenClothingRoutingModule { }
