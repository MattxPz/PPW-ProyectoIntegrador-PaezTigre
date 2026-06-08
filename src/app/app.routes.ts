import { Routes } from '@angular/router';
import { AppHero } from './components/app-hero/app-hero';
import { AppProfile } from './components/app-profile/app-profile';
import { AuthPage } from './features/auth-page/auth-page';
import { ProjectPage } from './features/project-page/project-page';
import { RequestsPageComponent } from './features/request-page/request-page';


export const routes: Routes = [
    {path: '', component: AppHero},
    {path: 'programador/:id', component: AppProfile},
    {path: 'login', component: AuthPage},
    {path: 'projects', component: ProjectPage},
    {path: 'requests', component: RequestsPageComponent},
    {path: '**', redirectTo: ''},
];
