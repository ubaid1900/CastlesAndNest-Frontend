import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Book } from '../models/book';
import { Cart, CartItem, CartItemType, Offer } from '../models/offer';
import { CartService } from '../services/cart.service';
import { ShippingService } from '../services/shipping.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent implements OnInit {
  cartItemType: typeof CartItemType = CartItemType;
  cart$!: Observable<Cart>;
  constructor(public cartService: CartService, private shippingService: ShippingService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.refreshCart();
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

  increaseQuantity(cartItem: CartItem) {
    this.cart$ = this.cartService.getItemsAllDetails(this.cartService.getItems()).pipe(tap((cart: Cart) => {
      var foundItem = cart.items.find(item => item.itemType === cartItem.itemType && item.itemId === cartItem.itemId);
      if (foundItem) {
        ++foundItem.quantity;
        if (foundItem.itemType === CartItemType.book) {
          cart.total += foundItem.bookPrice;
        }
        if (foundItem.itemType === CartItemType.offer) {
          cart.total += foundItem.offerPricingDetails.priceAfterDiscount;
        }
        this.cartService.addToCart(foundItem);

        const numItems = cart.items.map(m => m.quantity).reduce((prev, current) => prev + current, 0);
        this.shippingService.getShippingCosts(numItems)
          .subscribe((shippingCost) => {
            cart.shippingCost = shippingCost;
            cart.totalPlusShipping = cart.total + shippingCost;
          }, console.error);
      }
    }));
  }
  decreaseQuantity(cartItem: CartItem) {
    if (cartItem.quantity == 1) {
      return;
    }
    this.cart$ = this.cartService.getItemsAllDetails(this.cartService.getItems()).pipe(tap((cart: Cart) => {
      var foundItem = cart.items.find(item => item.itemType === cartItem.itemType && item.itemId === cartItem.itemId);
      if (foundItem && cartItem.quantity > 1) {
        --foundItem.quantity;
        if (foundItem.itemType === CartItemType.book) {
          cart.total -= foundItem.bookPrice;
        }
        if (foundItem.itemType === CartItemType.offer) {
          cart.total -= foundItem.offerPricingDetails.priceAfterDiscount;
        }
        this.cartService.addToCart(foundItem);
        const numItems = cart.items.map(m => m.quantity).reduce((prev, current) => prev + current, 0);
        this.shippingService.getShippingCosts(numItems)
          .subscribe((shippingCost) => {
            cart.shippingCost = shippingCost;
            cart.totalPlusShipping = cart.total + shippingCost;
          }, console.error);
      }
    }));
  }
  updateQuantity(cartItem: CartItem, evt: any) {
    if (+evt.target.value < 1) {
      evt.target.value = 1;
    }
    this.cart$ = this.cartService.getItemsAllDetails(this.cartService.getItems()).pipe(tap((cart: Cart) => {
      var foundItem = cart.items.find(item => item.itemType === cartItem.itemType && item.itemId === cartItem.itemId);
      if (foundItem) {
        const previousItemQuantity = foundItem.quantity;
        let newItemQuantity = +evt.target.value;
        if (+evt.target.value >= foundItem.availableQuantity) {
          newItemQuantity = foundItem.availableQuantity;
        }
        foundItem.quantity = newItemQuantity;
        if (foundItem.itemType === CartItemType.book) {
          const takeOffFromTotal = foundItem.bookPrice * previousItemQuantity;
          const addToTotal = foundItem.bookPrice * newItemQuantity;

          cart.total -= takeOffFromTotal;
          cart.total += addToTotal;
        }
        if (foundItem.itemType === CartItemType.offer) {
          const takeOffFromTotal = foundItem.offerPricingDetails.priceAfterDiscount * previousItemQuantity;
          const addToTotal = foundItem.offerPricingDetails.priceAfterDiscount * newItemQuantity;

          cart.total -= takeOffFromTotal;
          cart.total += addToTotal;
        }
        this.cartService.addToCart(foundItem);
        const numItems = cart.items.map(m => m.quantity).reduce((prev, current) => prev + current, 0);
        this.shippingService.getShippingCosts(numItems)
          .subscribe((shippingCost) => {
            cart.shippingCost = shippingCost;
            cart.totalPlusShipping = cart.total + shippingCost;
          }, console.error);
      }
    }));
  }
  remove(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem);
    this.refreshCart();
  }
  // closeResult = '';
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      if (result == 'Ok click') {
        this.cartService.clearCart();
        this.cart$ = of({} as Cart);
      }
    }, (reason) => {
      // this.closeResult = `${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `${reason}`;
    }
  }
  getFirstImageUrl(item: Book | Offer, itemType: CartItemType): string {
    if (itemType === CartItemType.book) {
      let book = item as Book;
      const images = book?.images;
      if (images && images.length) {
        return images[0].imageUrl;
      }
      return '';
    }
    if (itemType === CartItemType.offer) {
      let offer = item as Offer;
      return offer.imageUrl;
    }
    return '';
  }
  getDisplayPrice(item: Book | Offer, cartItem: CartItem): number | null {
    if (cartItem.itemType === CartItemType.book) {
      let book = item as Book;
      return book.price;
    }
    if (cartItem.itemType === CartItemType.offer) {
      let offer = item as Offer;
      return this.cartService.calculateOfferPriceAfterDiscount(offer, cartItem.quantity).priceAfterDiscount;
    }
    return null;
  }
  getItemType(item: CartItem) {
    return item.itemType === CartItemType.book ? "Book" : "Offer"
  }
  numericOnly(event: any): boolean {
    let patt = /^([0-9])$/;
    let result = patt.test(event.key);
    return result;
  }
}
