import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Offer } from '../models/offer';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  updateOffer(offer: Offer) {
    return this.http.put<Offer>(environment.apiUrl + 'offers/' + offer.id, offer);
  }
  addOffer(offer: Offer) {
    return this.http.post<Offer>(environment.apiUrl + 'offers/', offer);
  }

  constructor(private http: HttpClient) {
  }
  getOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>(environment.apiUrl + 'offers');
  }
  getOffer(id: number): Observable<Offer> {
    return this.http.get<Offer>(environment.apiUrl + 'offers/' + id);
  }
}
