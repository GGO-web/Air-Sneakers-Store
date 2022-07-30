import { ISneaker } from '../sneakers/sneakers.model';

export interface ICart {
   totalItems: number;
   cartItems: ICartItem[];
}

export interface ICartItem {
   price: number;
   count: number;
   sneaker: ISneaker;
}
