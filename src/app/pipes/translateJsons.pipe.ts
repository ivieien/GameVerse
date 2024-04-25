import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateJsons'
})
export class TranslateJsonsPipe implements PipeTransform {
  transform(value: any, language: string): any {
    if (value) {
      if (language === 'en' && value.textEN) {
        return value.textEN;
      } else if (language === 'es' && value.textES) {
        return value.textES;
      }
    }
    return null;
  }
}
