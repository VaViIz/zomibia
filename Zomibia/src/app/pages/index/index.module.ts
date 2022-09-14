import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index.component';
import { FormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    IndexComponent
  ],

  imports: [
    CommonModule,
    IndexRoutingModule,
    FormsModule,
    FlexLayoutModule
  ]
})
export class IndexModule { }
