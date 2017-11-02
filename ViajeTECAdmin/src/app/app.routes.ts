import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { Routes } from '@angular/router';

export const RouteHandler :Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', component: LoginComponent }
]



