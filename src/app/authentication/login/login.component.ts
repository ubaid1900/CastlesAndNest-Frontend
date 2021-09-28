import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SocialUser } from 'angularx-social-login';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ExternalAuthDto } from 'src/app/models/external-auth-dto';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  public errorMessage: string = '';
  public showError: boolean = true;
  private _returnUrl: string = '/';
  externalLoginSubscription!: Subscription;

  constructor(private _authService: AuthenticationService, private _router: Router, private _route: ActivatedRoute) { }
  ngOnDestroy(): void {
    this.externalLoginSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this._returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
  }

  public externalLogin = () => {
    this.showError = false;
    this._authService.signInWithGoogle()
      .then(res => {
        res
        const user: SocialUser = { ...res };
        this.validateExternalAuth(user);
      }, error => console.log(error))
  }

  public externalLoginFB = () => {
    this.showError = false;
    this._authService.signInWithFB()
      .then(res => {
        const user: SocialUser = { ...res };
        this.validateExternalAuth(user);
      }, error => console.log(error))
  }

  private validateExternalAuth(socialUser: SocialUser) {
    this.externalLoginSubscription = this._authService.externalLogin('accounts/externallogin',
     {provider: socialUser.provider, idToken: socialUser.idToken, authToken: socialUser.authToken} as ExternalAuthDto)
      .subscribe(res => {
        localStorage.setItem("token", res.token);
        this._authService.sendAuthStateChangeNotification(socialUser);
        this._router.navigate([this._returnUrl]);
      },
        error => {
          this.errorMessage = error;
          this.showError = true;
          this._authService.signOutExternal();
        });
  }
}