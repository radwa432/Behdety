import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideRouter(routes),
    provideHttpClient(withInterceptors([])),
    provideHttpClient(),

    importProvidersFrom(
      BrowserAnimationsModule,
      ToastrModule.forRoot()
    )
      ToastrModule.forRoot()
      )
  ],
};
