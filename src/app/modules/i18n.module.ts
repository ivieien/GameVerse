import {APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { I18NextModule, ITranslationService, defaultInterpolationFormat, I18NEXT_SERVICE  } from 'angular-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { HttpClientModule } from '@angular/common/http';

import translationES from "../../assets/i18n/es.json";
import translationEN from "../../assets/i18n/en.json";

const i18nextOptions = {
    debug: true,
    fallbackLng: 'es',
    resources: {
        es: {translation: translationES},
        en: {translation: translationEN}
    },
    interpolation: {
        format: I18NextModule.interpolationFormat(defaultInterpolationFormat)
    }
};
  
export function appInit(i18next: ITranslationService) {
    return () => i18next
        .use<any>(LanguageDetector)
        .init(i18nextOptions)
        .then(() => console.log('i18next initialized successfully'))
        .catch(error => console.error('Error initializing i18next', error));
}
export function localeIdFactory(i18next: ITranslationService)  {
    return i18next.language;
}

export const I18N_PROVIDERS = [
    {
      provide: APP_INITIALIZER,
      useFactory: appInit,
      deps: [I18NEXT_SERVICE],
      multi: true
    },
    {
      provide: LOCALE_ID,
      deps: [I18NEXT_SERVICE],
      useFactory: localeIdFactory
    },
];

@NgModule({
    imports: [
        HttpClientModule,
        I18NextModule.forRoot()
    ],
    providers: [I18N_PROVIDERS],
    exports: [I18NextModule],
}) 
export class i18nModule { } 