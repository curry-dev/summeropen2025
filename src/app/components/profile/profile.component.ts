import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user: any;
  tmp: any = {};
  username: string = '';
  home_city: string = '';
  saved_trips: any = [];
  tmp1: any = {};
  arr: any[] = [];

  constructor(
    private _apiservice: ApiService, 
    private _http: HttpClient
  ) { }

  getUser() {
    // this.user = firstValueFrom(this._apiservice.getUser());
    this._apiservice.getUser().subscribe((res) => {
      this.user = res;
      this.tmp = JSON.parse(JSON.stringify(this.user));
      this.username = this.tmp.name;
      this.home_city = this.tmp.home_city;
      this.saved_trips = this.tmp.saved_trips;
      for (let i = 0; i < this.saved_trips.length; i++) {
        this.tmp1 = this.objectKeys(this.saved_trips[i])
        this.arr.push(this.saved_trips[i][this.tmp1[0]]);
      }
      console.log('saved_trips =', this.arr);
      console.log('saved_trips =', this.saved_trips);
    });
  }

  objectKeys(obj: any) {
    return Object.keys(obj);
  }

  ngOnInit() {
    this.getUser();
  }
}
