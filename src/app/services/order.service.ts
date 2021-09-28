import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../models/offer';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  save(order: Order) {
    return this.http.post<Order>(`${environment.apiUrl}orders/`, order);
  }
  getOrder(id: number): Observable<Order> {
    return this.http.get<Order>(`${environment.apiUrl}orders/${id}`);
  }
  getOrders(filter: IOrderFilter): Observable<Order[]> {
    return this.http.get<Order[]>(`${environment.apiUrl}orders?filter=${JSON.stringify(filter)}`);
  }
}

export interface IOrderFilter {
  dateRange: IDateRange;
  userId: string;
}
export interface IDateRange {
  start: Date;
  end: Date;
}
