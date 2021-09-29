import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  getProduct(productId: any): import("rxjs").Observable<import("./models/book").Book | null> {
    throw new Error('Method not implemented.');
  }

  constructor() { }
}
