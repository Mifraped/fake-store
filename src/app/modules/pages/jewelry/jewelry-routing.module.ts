import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JewelryPageComponent } from './jewelry-page/jewelry-page.component';

const routes: Routes = [
  {
    path: '',
    component: JewelryPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JewelryRoutingModule { }
