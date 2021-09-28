import { Book } from "./book";
import { Payment } from "./Payment";

export interface Offer {
  id: number;
  description: string;
  starts: Date;
  deadline: Date;
  discountPercentage: number;
  imageUrl: string;
  offerItems: OfferItem[];
  availableQuantity: number;
}
export class OfferItem {
  bookId!: number;
  book?: Book;
}
export interface ICartItem {
  itemType: CartItemType;
  itemId: number;
  quantity: number;
}
export class CartItem implements ICartItem {
  itemType!: CartItemType;
  itemId!: number;
  quantity!: number;
  availableQuantity!: number;
  bookPrice!: number;
  description!: string;
  imageUrl!: string;
  offerPricingDetails!: IOfferPricingDetails;
}
export interface IOfferPricingDetails {
  priceBeforeDiscount: number;
  priceAfterDiscount: number;
  savingsAmount: number;
}
export enum CartItemType {
  book,
  offer
}
export class Cart {
  items!: CartItem[];
  total!: number;
  savings!: number;
  shippingCost!: number;
  totalPlusShipping!: number;
}

export interface Order {
  id: number;
  userId: string;
  subtotal: number;
  shippingCost: number;
  billingAddressId: number;
  shippingAddressId: number;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  items: ICartItem[];
  bookItems: IOrderBookItem[];
  offerItems: IOrderOfferItem[];
  payment: Payment;
  date: Date;
  billingAddressStreetnumber: string;
  billingAddressStreetname: string;
  billingAddressCity: string;
  billingAddressState: string;
  billingAddressZip: string;
  shippingAddressStreetnumber: string;
  shippingAddressStreetname: string;
  shippingAddressCity: string;
  shippingAddressState: string;
  shippingAddressZip: string;
}

export interface IOrderBookItem {
  book: Book;
  quantity: number;
  price: number;
}
export interface IOrderOfferItem {
  offer: Offer;
  quantity: number;
  discountPercentage: number;
}