import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Inject, OnInit } from '@angular/core';
import { I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('expandSearch', [
      state('collapsed', style({ width: '0' })),
      state('expanded', style({ width: '150px' })),
      transition('collapsed => expanded', animate('300ms ease-out')),
      transition('expanded => collapsed', animate('300ms ease-in'))
    ])
  ]
})
export class HeaderComponent {
  language = 'es';
  languages: string[] = ['en', 'es'];

  searchExpanded: boolean = false;
  sidebarOpen: boolean = false;
  constructor(   @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService) {};
  
  openSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  toggleSearch() {
    this.searchExpanded = !this.searchExpanded;
  }
  changeLanguage(lang: string){
    if (lang !== this.i18NextService.language) {
      this.i18NextService.changeLanguage(lang).then(x => {
        this.updateState(lang);
        document.location.reload();
      });
    }
  } 
  private updateState(lang: string) {
    this.language = lang;
  }

}
