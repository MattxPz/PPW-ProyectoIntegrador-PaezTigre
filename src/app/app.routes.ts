import { Routes } from '@angular/router';
import { AppHero } from './components/app-hero/app-hero';
import { AppProfile } from './components/app-profile/app-profile';

export const routes: Routes = [
    {path: '', component: AppHero},
    {path: 'programador/:id', component: AppProfile},
    {path: '**', redirectTo: ''},
];
    