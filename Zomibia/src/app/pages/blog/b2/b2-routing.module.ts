import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { B2Component } from './b2.component';

const routes: Routes = [{ path: '', component: B2Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class B2RoutingModule { }
