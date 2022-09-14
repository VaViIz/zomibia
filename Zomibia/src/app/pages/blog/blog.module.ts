import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    BlogComponent,

  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    FlexLayoutModule

  ]
})
export class BlogModule { }
