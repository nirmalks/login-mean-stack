import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
 import {AuthenticationService} from '../services/authentication.service';
@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(private router: Router , private authService: AuthenticationService) { }
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            return true; 
        }
        this.authService.redirectUrl = state.url;
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}