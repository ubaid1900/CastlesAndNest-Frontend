import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICompanyInfo } from '../models/company-info';

@Injectable({
  providedIn: 'root'
})
export class MiscService {

  constructor(private http: HttpClient) {
  }
  getCompanyInfo(): Observable<ICompanyInfo> {
    return this.http.get<ICompanyInfo>(environment.apiUrl + 'misc/CompanyInfo');
  }
}
