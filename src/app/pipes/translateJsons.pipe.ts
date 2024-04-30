import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateJsons'
})
export class TranslateJsonsPipe implements PipeTransform {
  transform(value: any, language: string): any {
    if (value) {
      if (language === 'es' && value.textES) {
        return value.textES;
      } else if (language === 'en' && value.textEN) {
        return value.textEN;
      }
    }
    return null;
  }
}
