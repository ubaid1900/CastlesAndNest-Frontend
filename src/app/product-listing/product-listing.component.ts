import { Component, OnInit } from '@angular/core';
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
  products$!: Observable<Product[]>;
  products!: Product[];
  constructor(private productService: ProductService, public authenticationService: AuthenticationService
    , private socialAuthService: SocialAuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.refresh();
  }

  private refresh() {
    let query = '';
    if (this.route.snapshot.queryParams['query']) {
      query = this.route.snapshot.queryParams['query'];

    }
    this.products$ = this.productService.getProducts().pipe(
      // flatMap((data: Product[]) => data),
      map(products =>
        products.filter(product => {
          let retValue = false;
          if (!this.authenticationService.isUserAdmin()) {
            retValue = !product.exclude;
          }
          if (query.length > 0) {
            retValue = product.name.toLocaleLowerCase().includes(query.toLocaleLowerCase());
          }
          return retValue;
        })
      )
    );
    // this.productService.getProducts().subscribe(result => {
    //   this.products = result;
    //   if (!this.authenticationService.isUserAdmin()) {
    //     this.products = this.products.filter(b => !b.exclude);
    //   }
    //   if (query.length > 0) {
    //     this.products = this.products.filter(prd => {
    //       if (prd.name.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
    //         return prd;
    //       }
    //       return null;
    //     });
    //   }
    // },
    //   error => console.error(error));
  }
}
