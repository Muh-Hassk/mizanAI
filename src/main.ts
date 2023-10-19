import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import './polyfills'; // Add this line to src/main.ts

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
