import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { NgxStripeModule } from 'ngx-stripe';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideRouter(routes),
    provideHttpClient(withInterceptors([])),
    provideHttpClient(),

    importProvidersFrom(
      NgxStripeModule.forRoot('sk_test_51RFbJC4bfO2JAI0zNr40KDwraBxM8JkQPvv9jXkZeHoPkvyhleb73nOpLZkJKA1dc3yzHmeuVFHj90GXHXVm7HQE00et58MqKB')
    )
  ],
};
