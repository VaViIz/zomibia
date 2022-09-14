import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/services/auth.guard';

const routes: Routes = [
  { 
    path: 'index', 
    loadChildren: () => import('./pages/index/index.module').then(m => m.IndexModule),
  },
  { 
    path: 'login', 
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
  },
  
    { path: 'contact', loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule) },
  { path: 'account', 
  loadChildren: () => import('./pages/account/account/account.module').then(m => m.AccountModule),
  canActivate: [AuthGuard]
},
  { path: 'product', loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule) },
  { path: 'blog', loadChildren: () => import('./pages/blog/blog.module').then(m => m.BlogModule) },
  {
    path: '',
    redirectTo: '/index',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/index',
  }
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
