import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainContentComponent } from './main-content/main-content.component';
import { RouterModule, Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', component: MainContentComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent },
//   { path: '',   redirectTo: '/heroes', pathMatch: 'full' },
//   { path: '**', component: 'Not Found'}
];
