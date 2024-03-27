import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { ProductCardComponent } from '../shared/components/product-card/product-card.component';
import { ProductTitleMaxPipe } from './pipes/product-title-max.pipe';
import { CategoryTraductorPipe } from '../shared/pipes/category-traductor.pipe';
import { CategoryRoutingPipe } from '../shared/pipes/category-routing.pipe';
import { FooterComponent } from './components/footer/footer.component';
import { SeparatorComponent } from './components/separator/separator.component';
import { SearchDialogComponent } from './components/search-dialog/search-dialog.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginFormComponent,
    SnackBarComponent,
    ProductCardComponent,
    ProductTitleMaxPipe,
    CategoryTraductorPipe,
    CategoryRoutingPipe,
    FooterComponent,
    SeparatorComponent,
    SearchDialogComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [
    LoginFormComponent,
    ProductCardComponent,
    CategoryTraductorPipe,
    CategoryRoutingPipe,
    FooterComponent,
    SeparatorComponent
  ]
})
export class SharedModule { }
