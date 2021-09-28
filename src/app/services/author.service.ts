import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Author } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) {
  }
  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(environment.apiUrl + 'authors');
  }
}
