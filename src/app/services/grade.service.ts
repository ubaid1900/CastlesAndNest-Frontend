import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Grade } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  constructor(private http: HttpClient) {
  }
  getGrades(): Observable<Grade[]> {
    return this.http.get<Grade[]>(environment.apiUrl + 'grades');
  }
}
