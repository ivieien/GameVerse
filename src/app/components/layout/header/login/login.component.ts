import { Component, ElementRef, HostListener, Inject, OnInit  } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  showModal: boolean = false;
 
  constructor(private elementRef: ElementRef, private loginService: LoginService) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  toggleModal(event: MouseEvent) {
    event.stopPropagation(); 
    this.showModal = !this.showModal;
  }

  closeModal() {
    this.showModal = false;
  }

  login() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    if (this.loginService.login(email, password)) {
      console.log('LOGUEAO!!'); 
      this.closeModal();
    } else {
      console.log('Invalid USER'); 
    }

  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const popUpElement = this.elementRef.nativeElement.querySelector('.popUp');
    if (popUpElement && !popUpElement.contains(event.target)) {
      this.closeModal();
    }
  }
}
