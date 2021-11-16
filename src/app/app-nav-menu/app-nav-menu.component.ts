import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { Observable, of, OperatorFunction } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { Product } from '../models/Product';
import { AuthenticationService } from '../services/authentication.service';
import { CartService } from '../services/cart.service';
import { MiscService } from '../services/misc.service';
import { NotifcationService } from '../services/notifcation-service';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './app-nav-menu.component.html',
  styleUrls: ['./app-nav-menu.component.css']
})
export class AppNavMenuComponent implements OnInit {
  public isUserAuthenticated: boolean = false;
  public isExternalAuth: boolean = true;
  hasNotifications$ = of(false);
  hasNotificationsInverse$ = of(false);
  currentUser: any;
  aboutUsTexts: string[] = [];
  aboutUsTextString: string = '';
  isCollapsed = true;
  constructor(public authenticationService: AuthenticationService, private router: Router,
    private socialAuthService: SocialAuthService, public cartService: CartService
    , private notifService: NotifcationService, private searchService: SearchService, private miscService: MiscService) { }

  ngOnInit(): void {
    this.aboutUsTexts = this.miscService.getAboutUs();
    this.hasNotifications$ = this.notifService.hasNotifications();
    this.hasNotificationsInverse$ = this.hasNotifications$.pipe(tap(v => !v));
    this.isUserAuthenticated = this.authenticationService.isUserAuthenticated();
    this.currentUser = this.authenticationService.getCurrentUser();
    this.authenticationService.authChanged
      .subscribe(res => {
        this.isUserAuthenticated = res !== null;
        this.currentUser = res;
      });

    this.socialAuthService.authState.subscribe(user => {
      this.isExternalAuth = user != null;
      this.currentUser = user;
    });
  }

  public logout = () => {
    if (this.isExternalAuth)
      this.authenticationService.signOutExternal();
    this.isUserAuthenticated = false;
    this.currentUser = null;
    this.router.navigate(["/"]);
  }
  search() {
    let navPath = ['/productsearch'];
    if (this.router.url.indexOf('productSearch') < 0) {
      navPath = ['/productSearch'];
    }
    this.router.navigate(navPath, { queryParams: { query: this.model } });
  }
  public model: any;
  searching = false;
  searchFailed = false;

  typeaheadSearch: OperatorFunction<string, readonly Product[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.searchService.search(term).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    )

    inputFormatter = (x: { name: string }) => {
      return x.name;
    };

}
