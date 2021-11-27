import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
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
  public carouselInterval = 0;
  @ViewChild('carousel', { static: false }) carousel!: NgbCarousel;

  constructor(private route: ActivatedRoute, public router: Router
    , public authenticationService: AuthenticationService, public location: Location,
    private title: Title, private meta: Meta) { }

  setSlide(slideId: number) {
    this.carousel?.select(slideId.toString());
  }
  ngOnInit(): void {
    this.refresh();
  }
  private refresh() {
    this.product = this.route.snapshot.data.product;
    this.title.setTitle(this.product.name);
    this.meta.addTags([
      { property: "og:title", content: `${this.product.name}` },
      { property: "og:type", content: "Product" },
      { property: "og:url", content: `${this.router['location']._platformLocation.location.href}` },
      { property: "og:image", content: `${this.product.images[0]?.imageUrl}` },
      // { property: "og:description", content: `${this.product.name}` },
    ]);
  }
  onShare() {
    // https://stackoverflow.com/a/68082077/9811833
    const title = 'Share';
    const url = `${this.router['location']._platformLocation.location.href}`;
    const text = `${this.product.name}`;
    if (navigator.share) {
      navigator
        .share({ title: `${title}`, url: `${url}`, text: `${text}` })
        .then(() => {
          console.log('Shared');
        })
        .catch(console.error);
    } else {
      window.open(`https://www.facebook.com/sharer.php?u=${url.trim()}&quote=${text}`);
    }
  } //onShare ends here

}
