export interface User {
    id: string;
    concurrencyStamp: string;
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber: string;
    addresses: Address[];
    isAdmin: boolean;
}
export interface Address {
    id: number;
    streetnumber: string;
    streetname: string;
    city: string;
    state: string;
    zip: string;
    userId: string;
}
