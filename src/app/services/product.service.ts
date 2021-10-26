import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product, Unit } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  updateProduct(product: Product) {
    return this.http.put<Product>(environment.apiUrl + 'products/' + product.id, product);
  }
  addProduct(product: Product) {
    return this.http.post<Product>(environment.apiUrl + 'products/', product);
  }
  getProducts(limit: number, catId: number = 0, subCatId: number = 0, relatedId = 0): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${environment.apiUrl}products?limit=${limit}&catId=${catId}&subCatId=${subCatId}&relatedId=${relatedId}`);
  }
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(environment.apiUrl + 'products/' + id);
  }
  getLengthUnits(): Observable<Unit[]> {
    return of(this.units.filter(f => f.type === 'distance'));

  }
  getWeigthUnits(): Observable<Unit[]> {
    return of(this.units.filter(f => f.type === 'weight'));
  }
  getDisplayName(unitName: string): string {
    return this.units.find(f => f.name === unitName)?.displayName ?? '';
  }
  units: Unit[] = [
    { name: 'Meter', displayName: 'm', type: 'distance' },
    { name: 'Centimeter', displayName: 'cm', type: 'distance' },
    { name: 'Millimeter', displayName: 'mm', type: 'distance' },
    { name: 'Inch', displayName: 'in', type: 'distance' },
    { name: 'Feet', displayName: 'ft', type: 'distance' },
    { name: 'Gram', displayName: 'g', type: 'weight' },
    { name: 'Kilogram', displayName: 'kg', type: 'weight' },
  ]
  constructor(private http: HttpClient) {
  }
}
