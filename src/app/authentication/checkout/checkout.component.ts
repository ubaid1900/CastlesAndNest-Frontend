import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Cart } from 'src/app/models/offer';
import { CartService } from 'src/app/services/cart.service';
import { ShippingService } from 'src/app/services/shipping.service';
import { ToastService } from 'src/app/services/toast.service';
import { Payment, PaymentMethod } from "../../models/Payment";
import { User } from '../../models/user';
import { AuthenticationService } from '../../services/authentication.service';
import { OrderService } from '../../services/order.service';
import { UserProfileService } from '../../services/user-profile.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  paymentMethod: typeof PaymentMethod = PaymentMethod;
  user$!: Observable<User>;
  cart$!: Observable<Cart>;
  sameAsBillingAddress = true;
  checkedBillingAddressId!: number;
  checkedShippingAddressId!: number;
  payment: Payment = {
    paymentMethod: PaymentMethod.CreditCard,
    nameOnCard: '',
    cardNumber: '',
    expiration: '',
    cVV: ''
  };
  saveSubscription!: Subscription;
  joinSubscription!: Subscription;

  constructor(private userProfileService: UserProfileService, private authenticationService: AuthenticationService
    , private orderService: OrderService, private router: Router, private shippingService: ShippingService,
    private cartService: CartService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.refresh();
  }
  ngOnDestroy(): void {
    this.joinSubscription?.unsubscribe();
    this.saveSubscription?.unsubscribe();
  }
  private refresh() {
    const currentUser = this.authenticationService.getCurrentUser();
    if (currentUser && currentUser.email) {
      this.user$ = this.userProfileService.getUser(currentUser);
    }
    else {
      this.router.navigate(['/']);
    }
    this.cart$ = this.cartService.getItemsAllDetails(this.cartService.getItems())
      .pipe(tap((cart: Cart) => {
        const numItems = cart.items.map(m => m.quantity).reduce((prev, current) => prev + current, 0);
        this.shippingService.getShippingCosts(numItems)
          .subscribe((shippingCost) => {
            cart.shippingCost = shippingCost;
            cart.totalPlusShipping = cart.total + shippingCost;
          }, console.error);
      }));
    ;
  }
  sameAsBillingAddressChanged() {
    this.sameAsBillingAddress = !this.sameAsBillingAddress;
    if (this.sameAsBillingAddress) {
      this.checkedShippingAddressId = this.checkedBillingAddressId;
    }
  }
  shippingAddressChanged(addressId: number) {
    this.checkedShippingAddressId = addressId;
  }
  billingAddressChanged(addressId: number) {
    this.checkedBillingAddressId = addressId;
    if (this.sameAsBillingAddress) {
      this.checkedShippingAddressId = addressId;
    }
  }
  paymentMethodChanged(paymethod: PaymentMethod) {
    this.payment.paymentMethod = paymethod;
  }
  placeOrder() {
    this.joinSubscription = forkJoin([
      this.cart$,
      this.user$]
    ).subscribe(
      ([cart, user]) => {
        let order = {
          id: 0,
          userId: user.id,
          subtotal: cart.total,
          shippingCost: cart.shippingCost,
          billingAddressId: this.checkedBillingAddressId,
          shippingAddressId: this.checkedShippingAddressId,
          firstname: user.firstname,
          lastname: user.lastname,
          phoneNumber: user.phoneNumber,
          items: cart.items,
          bookItems: [],
          offerItems: [],
          payment: this.payment,
          date: new Date(),
          billingAddressStreetnumber:'',
          billingAddressStreetname:'',
          billingAddressCity:'',
          billingAddressState:'',
          billingAddressZip:'',
          shippingAddressStreetnumber:'',
          shippingAddressStreetname:'',
          shippingAddressCity:'',
          shippingAddressState:'',
          shippingAddressZip:''
        }
        this.saveSubscription = this.orderService.save(order).subscribe(
          (data: any) => {
            this.toastService.showSuccess("Your order was successfully placed. You will receive an email summarizing the order.");
            this.cartService.clearCart();
            this.router.navigate([`user/order/${data.id}`]);
          },
          (err) => {
            this.toastService.showError("There was a problem processing your order. Please try again.");
            console.error(err);
          });
      }
    );

  }
}
