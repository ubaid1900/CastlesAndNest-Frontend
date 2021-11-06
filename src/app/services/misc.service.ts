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
    return [`<p>Welcome to castles AND Nest, your source for all Storage products. We're dedicated to giving you the very best of products, with a focus on Quality, environmental friendly products and Make in India.</p>


    <p>Founded in [2020] by group of friends, castles AND Nest has come a long way from its beginnings in Hyderabad. When we first started out, our passion for storage and eco-friendly products drove us to innovate, try some fusions, invent and discover so that castles AND Nest can offer you best range of storage products meeting every single need.</p>`,
      `<ul class="list-group">
      <li class="list-group-item"><strong>Our Motto</strong>: Deliver Quality and meet the expectations of our customers</li>
      <li class="list-group-item"><strong>Our Vision</strong>: To be the synonym of storage every time you think about storage it should be Castles and Nest Products.</li>
      <li class="list-group-item"><strong>Our Mission</strong>: Innovations, fusion and providing the best solutions for storage.</li>
      </ul>`,
      `<p>We now serve customers all over, and are thrilled that we're able to turn our passion into our Business. WE hope you enjoy OUR products as much as WE enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact with our team</p>`];
  }
}
