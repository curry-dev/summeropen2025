import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule, MapDirectionsService, GoogleMap } from '@angular/google-maps';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { GeocodingService } from '../../services/geocoding.service';

@Component({
  selector: 'app-feelinglucky',
  standalone: true,
  providers: [ApiService],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    GoogleMapsModule
  ],
  templateUrl: './feelinglucky.component.html',
  styleUrl: './feelinglucky.component.css'
})

export class FeelingluckyComponent implements OnInit {
  budget: FormControl = new FormControl(200);
  itinerary: any = {};
  title: string = 'title';

  @ViewChild('map', { static: false }) map!: GoogleMap;
  center = { lat: 40.712776, lng: -74.005974 };
  zoom = 15;
  directionsResults?: google.maps.DirectionsResult;
  crimes: any = [];
  markers: any[] = [];
  // city: string = '';
  spotco: any;

  flight_url = 'https://serpapi.com/search.json?engine=google_flights&departure_id=LAX&arrival_id=SFO&gl=us&hl=en&currency=USD&outbound_date=2025-04-07&return_date=2025-04-13&adults=1&api_key=cae937bd4ea5eb65c1ddbdb294e225109043846523b052e321cc4837ddc8611a'
  hotel_url = 'https://serpapi.com/search.json?engine=google&q=Coffee&location=San+Francisco+Bay+Area%2C+California%2C+United+States&google_domain=google.com&gl=us&hl=en&api_key=cae937bd4ea5eb65c1ddbdb294e225109043846523b052e321cc4837ddc8611a'
  flight_data: object = {};
  hotel_data: object = {};
  flight_lowest_price: number = 57;
  tmp: any = {};
  flight_search_url: string = 'https://www.google.com/travel/flights';
  tmp1: any = {};
  hotel_coordinates: any = {};
  hotel_search_url: string = 'https://www.google.com/travel/hotels';
  

  constructor(
    private _apiservice: ApiService, 
    private _http: HttpClient, 
    private directionsService: MapDirectionsService,
    private geocodingService: GeocodingService
  ) {}

  getCoordinates(city: string) {
    this.geocodingService.getCoordinates(city).subscribe(response => {
      if (response.results && response.results.length > 0) {
        this.center = response.results[0].geometry.location;
        this.map.googleMap?.setCenter(this.center);
        console.log('coordinates =', this.center);
      }
    });
  }

  getTrip(budget: number) {
    this._apiservice.getCalc('feelinglucky', this.budget.value).subscribe(res => {
      this.itinerary = res;
      console.log(this.itinerary[0]);
    });
  }

  getMarker(spot: any) {
    if (typeof spot == 'string') {
      this.geocodingService.getCoordinates(spot).subscribe(response => {
        if (response.results && response.results.length > 0) {
          this.center = response.results[0].geometry.location;
          console.log('spotco =', this.center);
        }
      });
      this.markers.push({position: this.center});
    }
    if (typeof spot == 'object') {
      this.center = { lat: spot.latitude, lng: spot.longitude };
      this.markers.push({position: this.center, label: { color: 'red', text: spot.name }});
    };
  }

  objectKeys(obj: any) {
    return Object.keys(obj);
  }

  getFlight() {
    this._http.get(this.flight_url).subscribe((response) => {
      this.flight_data = response;
      this.tmp = JSON.parse(JSON.stringify(response));
      this.flight_lowest_price = this.tmp.price_insights.lowest_price;
      this.flight_search_url = this.tmp.search_metadata.google_flights_url;
      console.log('Flight data:', response);
    });
  }

  goToFlight() {
    window.open(this.flight_search_url, '_blank');
  }

  getHotel() {
    this._http.get(this.hotel_url).subscribe((response) => {
      this.hotel_data = response;
      this.tmp1 = JSON.parse(JSON.stringify(response));
      this.hotel_coordinates = this.tmp1.local_map.gps_coordinates;
      this.hotel_search_url = this.tmp1.local_map.link;
      console.log('Hotel data:', response);
    });
  }

  goToHotel() {
    window.open(this.hotel_search_url, '_blank');
  }

  save() {
    this._apiservice.saveTrip(this.itinerary).subscribe();
  }

  // async getCrimes() {
  //   this.crimes = await firstValueFrom(this._apiservice.getCrimes());
  // }
    
  // addMarkers() {
  //   this.crimes.forEach((crime: { lat: any; lon: any; }) => {
  //     this.markers.push({
  //       position: { lat: crime.lat, lng: crime.lon }
  //     });
  //   });
  // }

  async ngOnInit() {
    // await this.getCrimes();
    // this.addMarkers();
    // this.getCoordinates();
    this.getFlight();
    this.getHotel();
  }
}
