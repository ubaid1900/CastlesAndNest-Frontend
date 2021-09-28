import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  updateBook(book: Book) {
    return this.http.put<Book>(environment.apiUrl + 'books/' + book.id, book);
  }
  addBook(book: Book) {
    return this.http.post<Book>(environment.apiUrl + 'books/', book);
  }

  constructor(private http: HttpClient) {
  }
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(environment.apiUrl + 'books');
  }
  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(environment.apiUrl + 'books/' + id);
  }
}


