import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CartItemType, Cart } from 'src/app/models/offer';
import { CartService } from 'src/app/services/cart.service';
import { ShippingService } from 'src/app/services/shipping.service';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartSummaryComponent implements OnInit, OnChanges {
  cartItemType: typeof CartItemType = CartItemType;
  @Input() cart$!: Observable<Cart>;
  constructor(public cartService: CartService, private shippingService: ShippingService, private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  private refreshCart() {
    this.cart$ = this.cartService.getItemsAllDetails(this.cartService.getItems()).pipe(tap((cart: Cart) => {
      const numItems = cart.items.map(m => m.quantity).reduce((prev, current) => prev + current, 0);
      this.shippingService.getShippingCosts(numItems)
        .subscribe((shippingCost) => {
          cart.shippingCost = shippingCost;
          cart.totalPlusShipping = cart.total + shippingCost;
        }, console.error);
    }));;
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.refreshCart();
  }

}
