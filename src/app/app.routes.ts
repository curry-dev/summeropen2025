import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SafemapComponent } from './components/safemap/safemap.component';
import { PlantripComponent } from './components/plantrip/plantrip.component';
import { FeelingluckyComponent } from './components/feelinglucky/feelinglucky.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home', 
        component: HomeComponent
    },
    {
        path: 'safemap', 
        component: SafemapComponent
    },
    {
        path: 'plantrip', 
        component: PlantripComponent
    },
    {
        path: 'feelinglucky', 
        component: FeelingluckyComponent
    },
    {
        path: 'profile', 
        component: ProfileComponent
    }
];

export default routes;