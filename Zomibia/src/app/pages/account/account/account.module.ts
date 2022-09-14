import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { Menu2Component } from '../menu2/menu2.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserComponent } from '../user/user.component';
import { CartComponent } from '../cart/cart.component';
import { OrdersComponent } from '../orders/orders.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    AccountComponent,
    Menu2Component,
    UserComponent,
    CartComponent,
    OrdersComponent,
    
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule
  ]
})
export class AccountModule { }
