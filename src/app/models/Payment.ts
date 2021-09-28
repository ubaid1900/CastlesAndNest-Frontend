export interface Payment {
    paymentMethod: PaymentMethod;
    nameOnCard: string;
    cardNumber: string;
    expiration: string;
    cVV: string;
}

export enum PaymentMethod {
    CreditCard,
    DebitCard,
    UPI
}