import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { PoHttpRequestModule, PoI18nModule, PoI18nConfig} from '@po-ui/ng-components';

// Configuração do i18n
const i18nConfig: PoI18nConfig = {
  default: {
    language:'pt-BR',
    context: 'general',
    cache: true
  },
    contexts: {
    general: {
  }
  }
};

export const appConfig: ApplicationConfig = {

  
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(PoI18nModule.config(i18nConfig)),
    importProvidersFrom([PoHttpRequestModule]),
    { provide:'Window' , useValue: window },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptorsFromDi())
  ],
  
};