import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotifcationService {

  constructor(private http: HttpClient) { }

  hasNotifications(): Observable<boolean> {
    return this.http.get<boolean>(`${environment.apiUrl}notifications/`);
  }
}
