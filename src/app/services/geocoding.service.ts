import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  private apiKey = 'AIzaSyCgouT5YTCAkd3Gd-XsPRRwv0gTknbJ314';

  constructor(private http: HttpClient) { }

  getCoordinates(city: string): Observable<any> {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${this.apiKey}`;
    return this.http.get(url);
  }
}