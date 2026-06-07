import { Routes } from '@angular/router';
import { AppHero } from './components/app-hero/app-hero';
import { AppProfile } from './components/app-profile/app-profile';
import { AuthPage } from './features/auth-page/auth-page';

export const routes: Routes = [
    {path: '', component: AppHero},
    {path: 'login', component: AuthPage},
    {path: 'programador/:id', component: AppProfile},
    {path: '**', redirectTo: ''},
];
    