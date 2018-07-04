import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Product } from 'shared/models/product';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/take'
import 'rxjs/add/operator/map'

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart():  Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/'+ cartId)
      .map(cart => new ShoppingCart(cart.items));
  }

  async addToCart(product: Product){
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product){
    this.updateItem(product, -1);
  }

  async clearCart(){
    let cartId = await this.getOrCreateCartId();
    this.db.object('shopping-carts/'+cartId + '/items').remove();
  }

  private create(){
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  }

  private getItem (cartId: string, productId: string){
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

 private async getOrCreateCartId(): Promise<string>{
    let cartId = localStorage.getItem('cartId');

    if(!cartId){
      //Fetch new ID from firebase and set it to local storage
      let result = await this.create();
      localStorage.setItem('cartId', result.key);
      return result.key;
    }

     return cartId;
    
  }

  private async updateItem (product:Product, operator: number){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.$key);
    item$.take(1).subscribe(item => {  
      let quantity = (item.quantity || 0 ) + operator;
      if(quantity===0) 
        {item$.remove()}
      else {
        item$.update({ 
        title: product.title, 
        imgaeUrl: product.imgaeUrl,
        size: product.size,
        price: product.price,
        quantity: quantity
       })}
  })
  }

}
