import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminGuard } from './admin.guard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddressEditComponent } from './address-edit/address-edit.component';
import { ManageRolesComponent } from '../authentication/manage-roles/manage-roles.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [AddressEditComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
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
