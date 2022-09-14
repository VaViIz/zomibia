import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { B2RoutingModule } from './b2-routing.module';
import { B2Component } from './b2.component';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    B2Component
  ],
  imports: [
    CommonModule,
    B2RoutingModule,
    FlexLayoutModule
  ]
})
export class B2Module { }
