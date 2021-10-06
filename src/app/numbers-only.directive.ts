// https://stackoverflow.com/a/58536245
import { Directive, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appNumbersOnly]'
})
export class NumbersOnlyDirective {
  @Input('appNumbersOnly') decimalLimit: number = 0;
  constructor(private ngControl: NgControl) { }
  @HostListener('input', ['$event']) onInput(event: { target: { value: any; }; }): void {
    const value = event.target.value;
    this.ngControl?.control?.setValue(parseFloat(value) || 0);
    // event.target.value = (value.match(/\d+\.?\d*/g) || [null])[0];
    // event.target.value = (value.match(/\d+\.?\d{0,2}/g) || [null])[0];

    let regex = `\\d+.?\\d{0,${this.decimalLimit}}`;
    if (this.decimalLimit === 0) {
      regex = '\\d+';
    }
    event.target.value = (value.match(regex) || [null])[0];
  }
}
