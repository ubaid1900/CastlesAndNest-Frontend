import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {

  constructor() { }
  getShippingCosts(itemQuantity: number) {
    if (itemQuantity % 2 === 0) {
      return of(100);
    }
    else {
      return of(200);
    }
  }
}
