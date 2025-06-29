import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }

  getCalc(whereto: string, budget: number) {
    return this._http.post('http://localhost:5001/calculate', { whereto: whereto, budget: budget });
  }

  getUser() {
    return this._http.get('http://localhost:5001/get_user');
  }

  getCrimes() {
    return this._http.get('http://localhost:5001/get_crimes');
  }

  saveTrip(itinerary: object) {
    return this._http.post('http://localhost:5001/save', { itinerary: itinerary });
  }
}
