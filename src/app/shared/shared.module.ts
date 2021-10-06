import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from '../spinner/spinner.component';
import { NumbersOnlyDirective } from '../numbers-only.directive';



@NgModule({
  declarations: [SpinnerComponent, NumbersOnlyDirective],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [SpinnerComponent, NumbersOnlyDirective]
})
export class SharedModule { }
