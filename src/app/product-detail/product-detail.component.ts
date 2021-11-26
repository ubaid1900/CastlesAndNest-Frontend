import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../models/Product';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  safeUrl!: SafeUrl
  public carouselInterval = 0;
  @ViewChild('carousel', { static: false }) carousel!: NgbCarousel;

  constructor(private route: ActivatedRoute, public router: Router
    , public authenticationService: AuthenticationService, public location: Location,
    private dom: DomSanitizer) { }

  setSlide(slideId: number) {
    this.carousel?.select(slideId.toString());
  }
  ngOnInit(): void {
    this.safeUrl = this.dom.bypassSecurityTrustUrl(`whatsapp://send?text=${this.router['location']._platformLocation.location.href}`);
    this.refresh();
  }
  private refresh() {
    this.product = this.route.snapshot.data.product;
  }

}
