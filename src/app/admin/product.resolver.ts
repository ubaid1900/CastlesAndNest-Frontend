import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Book } from '../models/book';
import { ProductService } from '../product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<Book | null> {
  constructor(private productService: ProductService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Book | null> {
    let productId = route.params['id'];
    if (+productId <= 0) {
      return of({} as Book);
    }
    return this.productService.getProduct(productId);
  }
}
