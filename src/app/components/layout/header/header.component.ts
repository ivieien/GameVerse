import { Component, Inject } from '@angular/core';
import { I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent {  
  language = 'es';
  languages: string[] = ['es', 'en', 'fr', 'de', 'zh'];
  showLanguage: boolean = false;

  constructor(@Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService, private loginService: LoginService) {
    const selectedLanguage = localStorage.getItem('selectedLanguage');
    if (selectedLanguage) {
      this.language = selectedLanguage;
    }
  }
  
  searchExpanded: boolean = false;

  toggleSearch() {
    this.searchExpanded = !this.searchExpanded;
  }  
  toggleLanguage() {
    this.showLanguage = !this.showLanguage;
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }
  
  changeLanguage(lang: string){
    if (lang !== this.i18NextService.language) {
      this.i18NextService.changeLanguage(lang).then(x => {
        localStorage.setItem('selectedLanguage', lang); 
        document.location.reload();
      });
    }
  } 
  
  isAdmin() {
    return this.loginService.getRole() === 'admin';
  }
}
