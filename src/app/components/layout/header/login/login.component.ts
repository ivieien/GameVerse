import { Component, Inject, OnInit  } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  showModal: boolean = false;
  language = 'es';
  languages: string[] = ['es', 'en', 'fr', 'de', 'zh'];
 
  constructor(@Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  toggleModal() {
    this.showModal = !this.showModal;
  } 

  closeModal() {
    this.showModal = false;
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
