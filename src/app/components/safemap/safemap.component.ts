import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule, MapDirectionsService } from '@angular/google-maps';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-safemap',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    GoogleMapsModule
  ],
  templateUrl: './safemap.component.html',
  styleUrl: './safemap.component.css'
})

export class SafemapComponent implements OnInit {
  wherefrom = new FormControl('');
  whereto = new FormControl('');
  crimes: any = [];

  center = { lat: 34.044727, lng: -118.249283 };
  zoom = 15;
  directionsResults?: google.maps.DirectionsResult;
  markers: any[] = [];
  roadblocks: any[] = [];
  alternatePoints: any[] = [];

  // roadblocks = [
  //   { lat: 34.045, lng: -118.25 },
  //   { lat: 34.043, lng: -118.248 }
  // ];
  
  // alternatePoints = [
  //   { lat: 34.047, lng: -118.246 },
  //   { lat: 34.042, lng: -118.244 }
  // ];
  
  



  constructor(
    private _apiservice: ApiService,
    private directionsService: MapDirectionsService
  ) {}

  getRoute() {
    const origin = this.wherefrom.value;
    const destination = this.whereto.value;

    this.crimes.forEach((crime: { lat: any; lon: any; }) => {
      this.roadblocks.push({ lat: crime.lat, lng: crime.lon });
      // this.alternatePoints.push({ lat: crime.lat - 0.005, lng: crime.lon + 0.005 });
    });

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



  async getCrimes() {
    this.crimes = await firstValueFrom(this._apiservice.getCrimes());
  }
    
  addMarkers() {
    this.crimes.forEach((crime: { lat: any; lon: any; }) => {
      this.markers.push({
        position: { lat: crime.lat, lng: crime.lon }
      });
    });
  }

  async ngOnInit() {
    await this.getCrimes();
    this.addMarkers();
  }
}
