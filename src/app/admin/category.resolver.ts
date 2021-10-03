import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { SubCategory } from '../models/category';
import { CategoryService } from '../services/category.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryResolver implements Resolve<SubCategory | null> {
  constructor(private categoryService: CategoryService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SubCategory | null> {
    let id = route.params['id'];
    if (+id <= 0) {
      return of({} as SubCategory);
    }
    return this.categoryService.getSubCategory(id);
  }
}
