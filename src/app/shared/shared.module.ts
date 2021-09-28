import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from '../spinner/spinner.component';



@NgModule({
  declarations: [SpinnerComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [SpinnerComponent]
})
export class SharedModule { }
