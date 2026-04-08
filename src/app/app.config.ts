import { ApplicationConfig, DEFAULT_CURRENCY_CODE, InjectionToken, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { CurrencyPipe } from '@angular/common';

export const DEFAULT_COUNTRY_CODE = new InjectionToken<string>('DEFAULT_COUNTRY_CODE');

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    { provide: LOCALE_ID, useValue: 'it-IT'},
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR'},
    CurrencyPipe,
    { provide: DEFAULT_COUNTRY_CODE, useValue: 'IT' }
  ]
};
