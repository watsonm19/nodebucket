/**
 * Title:  Nodebucket - Auth Guard
 * Author: Mark Watson
 * Date: 22 August 2021
 * Description: Guard file for Nodebucket.
**/

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  // use the router to navigate
  constructor(private router: Router, private cookieService: CookieService) {}

  // check if user is authenticated
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const sessionUser = this.cookieService.get('session_user');

    // if user is authenticated, allow access
    if (sessionUser) {
      return true;
      // if not a valid user, navigate to sign in page
    } else {
      this.router.navigate(['/session/signin']);
      return false;
    }
  }

}
