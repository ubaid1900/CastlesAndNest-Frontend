import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { Subject } from 'rxjs';
import { ExternalAuthDto } from '../models/external-auth-dto';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthResponseDto } from '../models/auth-response-dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  getCurrentUser(): SocialUser | null {
    let currentUserString = localStorage.getItem('currentUser');
    if (currentUserString) {
      return JSON.parse(currentUserString);
    }
    return null;
  }
  private _authChangeSub = new Subject<SocialUser>()
  public authChanged = this._authChangeSub.asObservable();

  constructor(private _http: HttpClient,
    private _jwtHelper: JwtHelperService,
    private _externalAuthService: SocialAuthService) { }

  public signInWithGoogle = () => {
    return this._externalAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  public signInWithFB = () => {
    return this._externalAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  public signOutExternal = () => {
    this._externalAuthService.signOut();
    localStorage.removeItem("token");
  }
  public isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("token");

    return !!token && !this._jwtHelper.isTokenExpired(token);
  }
  public externalLogin = (route: string, body: ExternalAuthDto) => {
    return this._http.post<AuthResponseDto>(this.createCompleteRoute(route, environment.apiUrl), body);
  }
  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}${route}`;
  }
  public sendAuthStateChangeNotification = (socialUser: SocialUser) => {
    if (socialUser) {
      localStorage.setItem('currentUser', JSON.stringify(socialUser));
    } else {
      localStorage.removeItem('currentUser');
    }
    this._authChangeSub.next(socialUser);
  }

  public isUserAdmin = (): boolean => {
    if (!this.isUserAuthenticated()) {
      return false;
    }
    const token = localStorage.getItem("token");
    const decodedToken = this._jwtHelper.decodeToken(token || undefined);
    if (!decodedToken) {
      return false;
    }
    const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']

    return role === 'Administrator';
  }
}
