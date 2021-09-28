import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }
  search(term: string): Observable<Book[]> {
    if (term === '') {
      return of([]);
    }
    return this.http.get<Book[]>(`${environment.apiUrl}books/quicksearch/${term}`);
  }
}
