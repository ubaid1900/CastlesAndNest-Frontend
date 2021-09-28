import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SocialUser } from 'angularx-social-login';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  updateAdminRole(email: string, checked: boolean) {
    return this.http.put<boolean>(environment.apiUrl + 'users/adminusers/' + email, checked);
  }
  save(user: User) {
    return this.http.put<User>(environment.apiUrl + 'users/' + user.email, user);
  }

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
  }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.apiUrl + 'users');
  }
  getUser(user: SocialUser): Observable<User> {
    return this.http.get<User>(environment.apiUrl + 'users/' + user.email);
  }
  getAdminUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.apiUrl + 'users/adminusers');
  }
}
