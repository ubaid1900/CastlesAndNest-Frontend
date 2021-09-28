import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
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
