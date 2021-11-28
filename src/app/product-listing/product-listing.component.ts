import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/Product';
import { ProductService } from '../services/product.service';
import { AuthenticationService } from '../services/authentication.service';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListingComponent implements OnInit, OnDestroy {
  @Input() showHeader = false;
  @Input() headerText = "Products";
  @Input() limit = 60; // 54 is the largest number of products. setting 60 as limit 
  @Input() display = 'list'; // carousel or grouped-carousel or list or accordion
  @Input() relatedId = 0;
  @Input() chunkSize = 3;
  public carouselInterval = environment.carouselInterval;
  products$!: Observable<Product[]>;
  groupedProducts$!: Observable<Product[][]>;
  subscriptions: Subscription[] = [];
  products!: Product[];
  constructor(private productService: ProductService, public authenticationService: AuthenticationService
    , private modalService: NgbModal, private toastService: ToastService, private route: ActivatedRoute
    , private router: Router, private changeDetectorRef: ChangeDetectorRef) {
    // override the route reuse strategy
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
  }

  ngOnInit(): void {
    this.refresh();
  }
  ngOnDestroy(): void {
    for (let index = 0; index < this.subscriptions.length; index++) {
      const element = this.subscriptions[index];
      element.unsubscribe();
    }
  }
  private refresh() {
    let query = this.route.snapshot.queryParams['query'] ?? '';
    let catId = this.route.snapshot.queryParams['catId'] ?? '0';
    let subCatId = this.route.snapshot.queryParams['subCatId'] ?? '0';

    
    if (query.length > 0) {
      this.products$ = this.productService.getProducts(this.limit, 0, 0, 0, query).pipe(
        map(products =>
          products.filter(product => {
            let retValue = false;
            if (!this.authenticationService.isUserAdmin()) {
              retValue = !product.exclude;
              return retValue;
            }
            return retValue;
          })
        )
      );
    } else {
      this.products$ = this.productService.getProducts(this.limit, catId, subCatId, this.relatedId).pipe(
        map(products =>
          products.filter(product => {
            let retValue = false;
            if (!this.authenticationService.isUserAdmin()) {
              retValue = !product.exclude;
              return retValue;
            }
            return retValue;
          })
        )
      );
    }


    

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

  openConfirmation(content: any, id: number) {
    const modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
    modalRef.result.then((result) => {
      if (result == 'Ok click') {
        const subscription = this.productService.deleteProduct(id).subscribe(
          () => {
            this.toastService.showSuccess('Product successfully removed!!!');
            this.refresh();
            this.changeDetectorRef.detectChanges();
          },
          (err) => {
            this.toastService.showError("There was a problem removing the category. Please try again.");
            console.error(err);
          }
        );
        this.subscriptions.push(subscription);
      }
    }, (reason) => {
      // this.closeResult = `${this.getDismissReason(reason)}`;
    });
  }
}
