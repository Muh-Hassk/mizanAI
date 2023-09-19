import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { SignupRoutingModule } from './signup-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { MatOptionModule } from '@angular/material/core';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SignupRoutingModule,
    RouterModule,
    TranslateModule,
  ]
})
export class SignupModule { }
