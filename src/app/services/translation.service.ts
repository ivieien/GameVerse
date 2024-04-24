/*import { Injectable } from '@angular/core';
import i18next from 'i18next';


@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  constructor() {
    i18next.init({
      lng: 'es', 
      fallbackLng: 'es',
      debug: true, 
      resources: {
        en: {
          translation: require('../../assets/i18/en.json') 
        },
        es: {
          translation: require('../../assets/i18n/es.json') 
        }
      }
    });
  }

  changeLanguage(language: string) {
    i18next.changeLanguage(language);
  }

  translate(key: string): string {
    return i18next.t(key);
  }
}*/