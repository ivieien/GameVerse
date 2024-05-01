import { Component, HostListener, Inject, ElementRef  } from '@angular/core';
import { I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  language = 'es';
  languages: string[] = ['es', 'en', 'fr', 'de', 'zh'];
  showLogin: boolean = false;

  constructor( @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService, 
              private elementRef: ElementRef) {};

  toggleLogin() {
    this.showLogin = !this.showLogin;
  } 
  stopPropagation(event: Event) {
    event.stopPropagation();
  }
  closeDropdown() {
    this.showLogin = false;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const isClickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!isClickedInside) {
      this.closeDropdown();
    }
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
