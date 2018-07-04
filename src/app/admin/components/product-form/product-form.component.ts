import { Product } from 'shared/models/product';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product:Product;
  id;

  constructor(private categoryService: CategoryService, 
              private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {

  

    this.categories$= this.categoryService.getCatagories();
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id){
      this.productService.getProductByID(this.id).take(1).subscribe(p => this.product = p);
    }

  }

  onSave(form){
    if(this.id){
        this.productService.update(this.id, this.product)
    }else{
      
      this.productService.create(form.value);
    }

    this.router.navigate(['/admin/products']); 
  }

  onDelete(){
    if(confirm('Delete this product?')){
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']); 
    }
  }

}
