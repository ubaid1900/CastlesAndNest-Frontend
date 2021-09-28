import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { WeatherForecast } from '../models/weather-forecast';

@Injectable({
  providedIn: 'root'
})
export class WeatherForecastService {

  constructor(private http: HttpClient) {
  }
  getForecasts() {
    return this.http.get<WeatherForecast[]>(environment.apiUrl + 'weatherforecast');
  }
}
