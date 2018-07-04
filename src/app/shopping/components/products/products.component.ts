import { Component, OnInit } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'shared/models/product';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap'
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  filtredProducts: Product[] = [];
  selectedCategory;
  cart$: Observable<ShoppingCart> ;

  constructor(private productService: ProductService, 
              private route: ActivatedRoute,
              private shoppingCartService : ShoppingCartService) { }

    async ngOnInit(){
     this.cart$ =  await this.shoppingCartService.getCart();
     this.populateProducts();

    }


    private populateProducts(){
      this.productService.getAllProducts()
        .switchMap( (products:Product[]) => {
          this.products = products;
          return this.route.queryParamMap;
        })    
        .subscribe(params => {
          this.selectedCategory = params.get('category');
          this.applyFilter();
        })
    }

    //Filterting by category
    private applyFilter(){   
      this.filtredProducts = (this.selectedCategory)? 
      this.products.filter(p => p.category === this.selectedCategory) : 
      this.products

    }


  

}
