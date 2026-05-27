import { Routes } from '@angular/router';
import { AppHero } from './components/app-hero/app-hero';

export const routes: Routes = [
    {path: '', component: AppHero},
    {path: '*', redirectTo: ''},
];
    