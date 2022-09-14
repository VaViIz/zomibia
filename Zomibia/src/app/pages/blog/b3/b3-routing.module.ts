import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { B3Component } from './b3.component';

const routes: Routes = [{ path: '', component: B3Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class B3RoutingModule { }
