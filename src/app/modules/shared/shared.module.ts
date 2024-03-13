import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';



@NgModule({
  declarations: [
    LoginFormComponent,
    SnackBarComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    LoginFormComponent
  ]
})
export class SharedModule { }
