import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlogComponent } from './blog.component';

const routes: Routes = [
  { path: '', component: BlogComponent },
  { path: 'b1', loadChildren: () => import('./b1/b1.module').then(m => m.B1Module) },
  { path: 'b2', loadChildren: () => import('./b2/b2.module').then(m => m.B2Module) },
  { path: 'b3', loadChildren: () => import('./b3/b3.module').then(m => m.B3Module) }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
