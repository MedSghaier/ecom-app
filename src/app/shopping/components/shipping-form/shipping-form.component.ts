import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { OrderService } from 'shared/services/order.service';
import { AuthService } from 'shared/services/auth.service';
import { Router } from '@angular/router';
import { Order } from 'shared/models/order';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;

  shipping = {}; 
  userSubscription : Subscription;
  userId: string; 

  constructor(
      private orderService: OrderService,
      private authService : AuthService,
      private router: Router) { }
  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid )

  }

  async placeOrder() {
    // debugger
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['order-success', result.key]);  
  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }

}
