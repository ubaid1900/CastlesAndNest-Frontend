import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

@NgModule({
  declarations: [
    PrivacyPolicyComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: PrivacyPolicyComponent }
      , { path: 'privacypolicy', component: PrivacyPolicyComponent }
      , { path: 'privacy', component: PrivacyPolicyComponent }
    ])
  ]
})
export class InformationModule { }
