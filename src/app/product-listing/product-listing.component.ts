import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { Observable, Subject } from 'rxjs';
import { filter, flatMap, map, tap } from 'rxjs/operators';
import { Product } from '../models/Product';
import { ProductService } from '../product.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent implements OnInit {
  @Input() limit: string = '0';
  limitNumber = 0;
  products$!: Observable<Product[]>;
  products!: Product[];
  constructor(private productService: ProductService, public authenticationService: AuthenticationService
    , private socialAuthService: SocialAuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.limitNumber = +this.limit;
    this.refresh();
  }

  private refresh() {
    let query = this.route.snapshot.queryParams['query'] ?? '';
    let sQuery = this.route.snapshot.queryParams['subcategoryid'] ?? '';

    this.products$ = this.productService.getProducts(this.limitNumber, 0).pipe(
      map(products =>
        products.filter(product => {
          let retValue = false;
          if (!this.authenticationService.isUserAdmin()) {
            retValue = !product.exclude;
          }
          if (sQuery.length > 0) {
            const sId = +sQuery;
            retValue = product.subCategoryId === sId;
          }
          if (query.length > 0) {
            retValue = product.name.toLocaleLowerCase().includes(query.toLocaleLowerCase());
          }
          if (query.length === 0 && sQuery.length === 0) {
            retValue = true;
          }
          return retValue;
        })
      )
    );
  }
}
