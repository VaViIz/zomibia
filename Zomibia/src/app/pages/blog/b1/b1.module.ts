import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { B1RoutingModule } from './b1-routing.module';
import { B1Component } from './b1.component';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    B1Component
  ],
  imports: [
    CommonModule,
    B1RoutingModule,
    FlexLayoutModule
  ]
})
export class B1Module { }
