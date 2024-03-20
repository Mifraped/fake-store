import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductTitleMaxPipe } from './pipes/product-title-max.pipe';


@NgModule({
  declarations: [
    LoginFormComponent,
    SnackBarComponent,
    ProductCardComponent,
    ProductTitleMaxPipe,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    LoginFormComponent,
    ProductCardComponent
  ]
})
export class SharedModule { }
