import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/Product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product!: Product;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  
    this.refresh();
  }
  private refresh() {
    this.product = this.route.snapshot.data.product;
    console.log(this.product.subCategory);
    
  }

}
