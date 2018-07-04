import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from 'shared/services/order.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit, OnDestroy {
  orders$;
  orderTotalPrice: number;
  subscription: Subscription;
  

  constructor(private orderService: OrderService) {

   }

  async ngOnInit() {
    this.orders$ = this.orderService.getOrders();
    
    this.orderTotalPrice =0;
    
    this.subscription = this.orders$.subscribe(orders=> 
        {orders.forEach(order=> {
          order.items.forEach(item => {
            this.orderTotalPrice+=item.totalPrice
          })
    })})
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
