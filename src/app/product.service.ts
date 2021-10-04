import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from "./models/Product";

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
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.apiUrl + 'products');
  }
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(environment.apiUrl + 'products/' + id);
  }

  constructor(private http: HttpClient) {
  }
}
