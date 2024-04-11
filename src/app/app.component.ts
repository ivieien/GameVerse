import { Component } from '@angular/core';
import { TranslationService } from './services/translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gameVerse';
  constructor(private translationService: TranslationService) {}

  changeLanguage(idioma: string) {
    this.translationService.changeLanguage(idioma);
  }
}
