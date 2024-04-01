import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { MaterialModule } from '../../material/material.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProfilePageComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MaterialModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ProfileModule { }
