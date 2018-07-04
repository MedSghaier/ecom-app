import { Product } from "./product";

export class ShoppingCartItem {
    $key: string;
    title: string;
    imgaeUrl: string;
    size: string;
    price: number;
    quantity: number;

    constructor(init?: Partial<ShoppingCartItem>){
        Object.assign(this, init)
    }

    get totalPrice() {
        return this.price * this.quantity;
    }
}