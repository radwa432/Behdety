import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { NgxStripeModule } from 'ngx-stripe';
import { ToastrModule } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideRouter(routes),
    provideHttpClient(withInterceptors([])),
    provideHttpClient(),

    importProvidersFrom(
      BrowserAnimationsModule,
      ToastrModule.forRoot(),
      NgxStripeModule.forRoot('sk_test_51RFbJC4bfO2JAI0zNr40KDwraBxM8JkQPvv9jXkZeHoPkvyhleb73nOpLZkJKA1dc3yzHmeuVFHj90GXHXVm7HQE00et58MqKB')
    )
  ],
};
