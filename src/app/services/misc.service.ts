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
  getAboutUs(): string[] {
    return ["Castles and Nest, A Hashone Creation!", "Slide 3.", "Improving lives one product at a time."];
  }
  getAboutUsTextString(): string {
    return `Castles and Nest, A Hashone Creation! Improving lives one product at a time. Created in 2020, it aims to bring ease to every household 
    throught its innovative products. Backed with well researched usage habits, it helps in all day to day household activities with less stress.`;
  }
}
