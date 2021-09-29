import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminGuard } from './admin.guard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddressEditComponent } from './address-edit/address-edit.component';
import { ManageRolesComponent } from '../authentication/manage-roles/manage-roles.component';
import { SharedModule } from '../shared/shared.module';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductResolver } from './product.resolver';



@NgModule({
  declarations: [AddressEditComponent, ProductEditComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'product/edit/:id', component: ProductEditComponent, resolve: {book: ProductResolver} },
      // {path:'product/edit/:id', component: ProductEditComponent, canActivate: [AdminGuard], resolve: {book: ProductResolver} },
      {path: 'manageroles', component: ManageRolesComponent, canActivate: [AdminGuard]}
    ]),
    FormsModule,
    ReactiveFormsModule,
    NgbModule, //TODO:: instead of importing everything, optimize this to import only what we need.
    SharedModule
  ],
  providers: []
})
export class AdminModule { }
