import { ShoppingCart } from "./shopping-cart";

export class Order {
    datePlaced: number;
    items: any[];

    constructor(public userId: string, public shipping : any, shoppingCart: ShoppingCart){
        this.datePlaced = new Date().getTime();

        this.items = shoppingCart.items.map(item => {
            return {
              product: {
                title: item.title,
                imgaeUrl: item.imgaeUrl,
                size: item.size,
                price: item.price
              },
              quantity : item.quantity,
              totalPrice: item.totalPrice
            }
          })
    }
}