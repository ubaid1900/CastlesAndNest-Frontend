import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cart, CartItem, ICartItem, IOfferPricingDetails, Offer } from '../models/offer';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private http: HttpClient) {
    this.retrieveSavedCart();
  }
  private items: ICartItem[] = [];
  addToCart(entry: ICartItem) {
    var foundItem = this.items.find(item => item.itemType === entry.itemType && item.itemId === entry.itemId)
    if (foundItem) {
      foundItem.quantity = entry.quantity;
    } else {
      this.items.push(entry);
    }
    this.saveCart();
  }
  removeFromCart(entry: ICartItem) {
    var foundItem = this.items.find(item => item.itemType === entry.itemType && item.itemId === entry.itemId)
    this.items = this.items.filter(item => item !== foundItem);
    this.saveCart();
  }
  getItems() {
    return this.items;
  }
  getItemsAllDetails(inp: ICartItem[]) : Observable<Cart> {
    return this.http.post<Cart>(environment.apiUrl + 'cart', inp);
  }

  clearCart() {
    this.items = [];
    this.saveCart();
  }

  private retrieveSavedCart() {
    var cart = localStorage.getItem("cart");
    if (cart) {
      this.items = JSON.parse(cart) as ICartItem[];
    }
  }
  private saveCart() {
    localStorage.setItem("cart", JSON.stringify(this.items));
  }
  // calculate on server
  calculateOfferPriceAfterDiscount(offer: Offer, quantity: number) {
    let [priceBeforeDiscount, priceAfterDiscount, savingsAmount] = [0, 0, 0];
    if (!offer) {
      return { priceBeforeDiscount, priceAfterDiscount, savingsAmount } as IOfferPricingDetails;
    }
    var prices = offer.offerItems.map(oi => oi.book?.price ?? 0);

    priceBeforeDiscount = prices.reduce((a, b) => a + b, 0);
    priceAfterDiscount = priceBeforeDiscount - priceBeforeDiscount * offer.discountPercentage / 100;
    savingsAmount = priceBeforeDiscount - priceAfterDiscount;
    return { priceBeforeDiscount, priceAfterDiscount, savingsAmount } as IOfferPricingDetails;
  }
}
