import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Check if 'login' is true in localStorage
    const isLoggedIn = localStorage.getItem('login') === 'true';

    if (!isLoggedIn) {
      // If not logged in, redirect to home page
      this.router.navigate(['/']);
      return false; // Prevent navigation
    }
    // If logged in, allow navigation
    return true;
  }
}
