import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Product } from '../models/Product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  public carouselInterval = environment.carouselInterval;

  constructor(private route: ActivatedRoute, public router: Router) { }

  ngOnInit(): void {
  
    this.refresh();
  }
  private refresh() {
    this.product = this.route.snapshot.data.product;
    console.log(this.product.subCategory);
    
  }

}
