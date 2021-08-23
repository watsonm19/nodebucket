/**
 * Title:  Nodebucket - Base Layout
 * Author: Mark Watson
 * Date: 22 August 2021
 * Description: Base layout component for Nodebucket.
**/

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {

  year: number = Date.now();

  constructor() { }

  ngOnInit(): void {
  }

}
