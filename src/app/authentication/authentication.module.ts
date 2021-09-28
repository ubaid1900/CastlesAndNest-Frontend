import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { AuthenticationGuard } from './authentication.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageRolesComponent } from './manage-roles/manage-roles.component';
import { CartSummaryComponent } from './cart-summary/cart-summary.component';
import { CreditCardDirectivesModule } from 'angular-cc-library';
import { OrderComponent } from './order/order.component';
import { OrdersComponent } from './orders/orders.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LoginComponent, UserProfileComponent, CheckoutComponent, ManageRolesComponent, CartSummaryComponent, OrderComponent, OrdersComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: LoginComponent },
      { path: 'login', component: LoginComponent },
      { path: 'checkout', component: CheckoutComponent, canActivate: [AuthenticationGuard] },
      { path: 'orders', component: OrdersComponent, canActivate: [AuthenticationGuard] },
      { path: 'order/:id', component: OrderComponent, canActivate: [AuthenticationGuard] },
      { path: 'profile', component: UserProfileComponent, canActivate: [AuthenticationGuard] }
    ]),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CreditCardDirectivesModule,
    SharedModule
  ]
})
export class AuthenticationModule { }
