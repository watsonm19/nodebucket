/**
 * Title:  Nodebucket - Base Layout
 * Author: Mark Watson
 * Date: 5 September 2021
 * Description: Base layout component for Nodebucket.
**/

import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {

  year: number = Date.now();
  isLoggedIn: boolean;
  name: string;

  constructor(private cookieService: CookieService, private router: Router) {
    // get the cookie
    this.isLoggedIn = this.cookieService.get('session_user') ? true : false;

    // get the user's name and store it
    this.name = sessionStorage.getItem('name');
    console.log('Signed in as user ' + this.name);
  }

  ngOnInit(): void {
  }

  /**
   * Delete cookie to sign out and redirect to sign in page
   */
  signOut()
  {
    this.cookieService.deleteAll();
    this.router.navigate(['/session/signin']);
  }

}
