import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideZoneChangeDetection } from '@angular/core';

const options = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true })]
}

bootstrapApplication(AppComponent, options).catch((err) => console.error(err));
