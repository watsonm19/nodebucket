/**
 * Title:  Nodebucket
 * Author: Mark Watson
 * Date: 22 August 2021
 * Description: Default main TypeScript file for Nodebucket.
**/

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
