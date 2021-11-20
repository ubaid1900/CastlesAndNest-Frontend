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
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { CategoryResolver } from './category.resolver';
import { SubCategoryEditComponent } from './sub-category-edit/sub-category-edit.component';
import { SubCategoryResolver } from './subcategory.resolver';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';



@NgModule({
  declarations: [AddressEditComponent, ProductEditComponent, CategoryEditComponent, SubCategoryEditComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'subcategory/edit/:id', component: SubCategoryEditComponent, canActivate: [AdminGuard], resolve: {subcategory: SubCategoryResolver} },
      {path:'subcat/edit/:id', component: SubCategoryEditComponent, canActivate: [AdminGuard], resolve: {subcategory: SubCategoryResolver} },
      {path:'category/edit/:id', component: CategoryEditComponent, canActivate: [AdminGuard], resolve: {category: CategoryResolver} },
      {path:'cat/edit/:id', component: CategoryEditComponent, canActivate: [AdminGuard], resolve: {category: CategoryResolver} },
      {path:'product/edit/:id', component: ProductEditComponent, canActivate: [AdminGuard], resolve: {product: ProductResolver} },
      {path:'products/edit/:id', component: ProductEditComponent, canActivate: [AdminGuard], resolve: {product: ProductResolver} },
      {path: 'manageroles', component: ManageRolesComponent, canActivate: [AdminGuard]}
    ]),
    FormsModule,
    ReactiveFormsModule,
    NgbModule, //TODO:: instead of importing everything, optimize this to import only what we need.
    SharedModule,
    CKEditorModule
  ],
  providers: []
})
export class AdminModule { }
