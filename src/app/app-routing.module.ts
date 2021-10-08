import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductResolver } from './admin/product.resolver';
import { CategoryListComponent } from './category-list/category-list.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { SubCategoryListComponent } from './sub-category-list/sub-category-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'product/:id', component: ProductDetailComponent, resolve: { product: ProductResolver } },
  // the below two routes differ only in case (upper case S vs lower case s) to facilitate 
  // search on different terms
  { path: 'productsearch', component: ProductListingComponent }, { path: 'productSearch', component: ProductListingComponent },
  { path: 'categories', component: CategoryListComponent },
  { path: 'subcategories', component: SubCategoryListComponent },
  { path: 'cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule) },
  { path: 'user', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'information', loadChildren: () => import('./Information/information.module').then(m => m.InformationModule) },
  { path: 'privacypolicy', loadChildren: () => import('./Information/information.module').then(m => m.InformationModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
