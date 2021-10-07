import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  delete(imageUrl: string) {
    const lof = imageUrl.lastIndexOf('/');
    const ss = imageUrl.substring(lof + 1);

    return this.http.delete(`${environment.apiUrl}files/${ss}`);
  }
  upload(formData: FormData): Observable<string[]> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    const requestOptions: Object = {
      ...headers
    }
    return this.http.post<string[]>(environment.apiUrl + 'files', formData, requestOptions);
  }

  constructor(private http: HttpClient) {
  }
}
