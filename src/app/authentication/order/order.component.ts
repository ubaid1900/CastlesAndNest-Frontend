import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Offer, Order } from 'src/app/models/offer';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderComponent implements OnInit {
  order$!: Observable<Order>;
  constructor(private orderservice: OrderService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.order$ = this.orderservice.getOrder(+this.route.snapshot.params["id"]);
  }
  calculateOfferPrices(offer: Offer) {
    var prices = offer.offerItems.map(oi => oi.book?.price ?? 0);

    let priceBeforeDiscount = prices.reduce((a, b) => a + b, 0);
    let priceAfterDiscount = priceBeforeDiscount - priceBeforeDiscount * offer.discountPercentage / 100;
    return priceAfterDiscount;
  }

}
