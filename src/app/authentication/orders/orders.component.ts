import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/offer';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { IOrderFilter, OrderService } from 'src/app/services/order.service';
import { UserProfileService } from 'src/app/services/user-profile.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orders$!: Observable<Order[]>;
  users$!: Observable<User[]>;
  orderFilter!: IOrderFilter;
  constructor(private orderService: OrderService, private userProfileService: UserProfileService
    , public authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.clearFilter();
    this.users$ = this.userProfileService.getUsers();
    this.orders$ = this.orderService.getOrders(this.orderFilter);
  }
  clearFilter() {
    this.orderFilter = { userId: 'All', dateRange: {} } as IOrderFilter;
  }
  applyFilter() {
    this.orders$ = this.orderService.getOrders(this.orderFilter);
  }
}
