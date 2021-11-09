import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/Product';
import { ProductService } from '../services/product.service';
import { AuthenticationService } from '../services/authentication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListingComponent implements OnInit {
  @Input() showHeader = false;
  @Input() headerText = "Products";
  @Input() limit = 0;
  @Input() display = 'list'; // carousel or grouped-carousel or list or accordion
  @Input() relatedId = 0;
  @Input() chunkSize = 3;
  public carouselInterval = environment.carouselInterval;
  products$!: Observable<Product[]>;
  groupedProducts$!: Observable<Product[][]>;
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

    this.products$ = this.productService.getProducts(this.limit, catId, subCatId, this.relatedId).pipe(
      map(products =>
        products.filter(product => {
          let retValue = false;
          if (!this.authenticationService.isUserAdmin()) {
            retValue = !product.exclude;
            return retValue;
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

    this.groupedProducts$ = this.products$.pipe(
      map(products => {
        let groupedProducts: Product[][] = [];
        let processed = 0;
        while (processed < products.length) {
          const chunkPrds = products.slice(processed, processed + this.chunkSize);
          processed += chunkPrds.length;
          groupedProducts.push(chunkPrds);
        }
        return groupedProducts;
      })
    );
  }
}
