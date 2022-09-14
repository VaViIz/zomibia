import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { B1Component } from './b1.component';

const routes: Routes = [{ path: '', component : B1Component}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class B1RoutingModule { }
