import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category, SubCategory } from '../models/category';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  getSubCategories(categoryId: number = 0): Observable<SubCategory[]> {
    return this.http.get<SubCategory[]>(`${environment.apiUrl}subcategories?catId=${categoryId}`);
  }
  addSubCategory(category: SubCategory) {
    return this.http.post<SubCategory>(environment.apiUrl + 'subcategories/', category);
  }
  updateSubCategory(category: SubCategory) {
    return this.http.put<SubCategory>(environment.apiUrl + 'subcategories/' + category.id, category);
  }
  
  subCategoryExists(value: string) : Observable<boolean> {
    return of(true);
  }
  getSubCategory(id: number): Observable<SubCategory | null> {
    return this.http.get<SubCategory>(`${environment.apiUrl}subcategories/${id}`);
  }


  
  addCategory(category: Category) {
    return this.http.post<Category>(environment.apiUrl + 'categories/', category);
  }
  updateCategory(category: Category) {
    return this.http.put<Category>(environment.apiUrl + 'categories/' + category.id, category);
  }
  
  categoryExists(value: string) : Observable<boolean> {
    return of(true);
  }
  getCategory(id: number): Observable<Category | null> {
    return this.http.get<Category>(`${environment.apiUrl}categories/${id}`);
  }
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiUrl}categories/`);
  }

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
  }
}
