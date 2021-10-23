import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/Product';
import { ProductService } from '../services/product.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent implements OnInit {
  @Input() showHeader = false;
  @Input() headerText = "Products";
  @Input() limit = 0;
  products$!: Observable<Product[]>;
  products!: Product[];
  constructor(private productService: ProductService, public authenticationService: AuthenticationService
    , private socialAuthService: SocialAuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.refresh();
  }

  private refresh() {
    let query = this.route.snapshot.queryParams['query'] ?? '';
    let catId = this.route.snapshot.queryParams['catId'] ?? '0';
    let subCatId = this.route.snapshot.queryParams['subCatId'] ?? '0';

    this.products$ = this.productService.getProducts(this.limit, catId, subCatId).pipe(
      map(products =>
        products.filter(product => {
          let retValue = false;
          if (!this.authenticationService.isUserAdmin()) {
            retValue = !product.exclude;
          }
          // if (sQuery.length > 0) {
          //   const sId = +sQuery;
          //   retValue = product.subCategoryId === sId;
          // }
          if (query.length > 0) {
            retValue = product.name.toLocaleLowerCase().includes(query.toLocaleLowerCase());
          }
          if (query.length === 0) {
            retValue = true;
          }
          return retValue;
        })
      )
    );
  }
}
