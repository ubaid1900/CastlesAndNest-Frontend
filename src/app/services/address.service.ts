import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Address } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  updateAddress(address: Address) {
    return this.http.put<Address>(environment.apiUrl + 'addresses/' + address.id, address);
  }
  addAddress(address: Address) {
    return this.http.post<Address>(environment.apiUrl + 'addresses/', address);
  }
  getAddresss(): Observable<Address[]> {
    return this.http.get<Address[]>(environment.apiUrl + 'addresses');
  }
  getAddress(id: number): Observable<Address> {
    return this.http.get<Address>(environment.apiUrl + 'addresses/' + id);
  }

  constructor(private http: HttpClient) {
  }
}
