import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Subject } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) {
  }
  getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(environment.apiUrl + 'subjects');
  }
}
