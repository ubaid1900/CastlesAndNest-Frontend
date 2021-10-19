import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryResolver implements Resolve<Category | null> {
  constructor(private categoryService: CategoryService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Category | null> {
    let id = route.params['id'];
    if (+id <= 0) {
      return of({} as Category);
    }
    return this.categoryService.getCategory(id);
  }
}
