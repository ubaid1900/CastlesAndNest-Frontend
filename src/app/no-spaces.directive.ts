import { Directive, Input } from '@angular/core';
import { AbstractControl, FormControl, NG_VALIDATORS, ValidationErrors, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appNoSpaces]',
  providers: [{provide: NG_VALIDATORS, useExisting: NoSpacesDirective, multi: true}]
})
export class NoSpacesDirective {

  @Input('appNoSpaces') num: number | undefined;

  constructor() { }
  validate(control: AbstractControl): ValidationErrors | null{
    // return noSpaces(control);
    return this.num ? noSpaces2(this.num)(control) : null;
  }

}

export function noSpaces2(num: number): ValidatorFn | any {
  return (c: FormControl): ValidationErrors | null => {
    const spacesRegex = `^\\s{${num},}$`;
    const regex = new RegExp(spacesRegex);
    const isJustSpaces = regex.test(c.value);
    if (isJustSpaces) {
      return {somekey: true};
    }
    return null;
  };
}
export function noSpaces(control: AbstractControl): ValidationErrors | null {
  const spacesRegex = `^\\s{${3},}$`;
  const regex = new RegExp(spacesRegex);
  const isJustSpaces = regex.test(control.value);

  if (isJustSpaces) {
    return { somekey: true };
  }
  return null;
}

