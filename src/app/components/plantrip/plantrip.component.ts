import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule, MapDirectionsService } from '@angular/google-maps';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { GeocodingService } from '../../services/geocoding.service';

@Component({
  selector: 'app-plantrip',
  standalone: true,
  providers: [ApiService],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    GoogleMapsModule
  ],
  templateUrl: './plantrip.component.html',
  styleUrl: './plantrip.component.css'
})

export class PlantripComponent implements OnInit {
  whereto: FormControl = new FormControl('Los Angeles, CA');
  budget: FormControl = new FormControl(200);
  itinerary: any = {};
  title: string = 'title';

  center = { lat: 40.712776, lng: -74.005974 };
  zoom = 15;
  directionsResults?: google.maps.DirectionsResult;
  crimes: any = [];
  markers: any[] = [];
  
  constructor(
    private _apiservice: ApiService, 
    private _http: HttpClient, 
    private directionsService: MapDirectionsService,
    private geocodingService: GeocodingService
  ) {}

  getTrip(whereto: string, budget: number) {
    this._apiservice.getCalc(this.whereto.value, this.budget.value).subscribe(res => {
      this.itinerary = res;
      console.log(this.itinerary);
    });
  }

  objectKeys(obj: any) {
    return Object.keys(obj);
  }

  getRoute(dest: string) {
    const origin = 'University of Southern California, Los Angeles, CA';
    const destination = dest || this.whereto.value;

    if (!origin || !destination) {
      alert('Please enter both origin and destination.');
      return;
    }

    this.directionsService
      .route({
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true
      })
      .subscribe({
        next: (response) => {
          this.directionsResults = response.result;
        },
        error: (error) => {
          console.error('Error fetching directions:', error);
        }
      });
  }

  getMarker(spot: any) {
    if (typeof spot == 'string') {
      this.geocodingService.getCoordinates(spot).subscribe(response => {
        if (response.results && response.results.length > 0) {
          this.center = response.results[0].geometry.location;
          // console.log('spotco =', this.center);
        }
      });
      this.markers.push({position: this.center});
    }
    if (typeof spot == 'object') {
      this.center = { lat: spot.latitude, lng: spot.longitude };
      this.markers.push({position: this.center, label: { color: 'red', text: spot.name }});
    };
  }

  async getCrimes() {
    this.crimes = await firstValueFrom(this._apiservice.getCrimes());
    console.log('crimes =', this.crimes);
  }
    
  addMarkers() {
    this.crimes.forEach((crime: { lat: any; lon: any; }) => {
      this.markers.push({
        position: { lat: crime.lat, lng: crime.lon }
      });
    });
  }

  save() {
    this._apiservice.saveTrip(this.itinerary).subscribe();
  }

  async ngOnInit() {
    await this.getCrimes();
    this.addMarkers();
  }
}
