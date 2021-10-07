import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }
  search(term: string): Observable<Product[]> {
    if (term === '') {
      return of([]);
    }
    return this.http.get<Product[]>(`${environment.apiUrl}products/quicksearch/${term}`);
  }
}
