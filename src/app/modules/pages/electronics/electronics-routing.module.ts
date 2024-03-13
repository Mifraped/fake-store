import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElectronicsPageComponent } from './electronics-page/electronics-page.component';

const routes: Routes = [
  {
    path: '',
    component: ElectronicsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElectronicsRoutingModule { }
