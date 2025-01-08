import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  registerForm: FormGroup = new FormGroup({});
  recoveryForm: FormGroup = new FormGroup({});

  activeModal: 'login' | 'register' | 'recovery' | null = null;

  loginError: boolean = false;
  registrationError: boolean = false;
  registrationSuccess: boolean = false;
  recoveryError: boolean = false;
  recoverySuccess: boolean = false;

  currentUser: any = null;
  isLoggedIn: boolean = false;

  @ViewChild('loginModal') loginModal?: ElementRef;
  @ViewChild('recoveryModal') recoveryModal?: ElementRef;
  @ViewChild('registerModal') registerModal?: ElementRef;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });

    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      username: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.pattern('^[a-zA-Z0-9]+$')])
    });

    this.recoveryForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });

    this.loginService.openLogin.subscribe(open => {
      if (open) {
        this.toggleModal('login');
      }
    });
  }

  toggleModal(modal: 'login' | 'register' | 'recovery' | null) {
    this.activeModal = modal;
  }

  login() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    if (this.loginService.login(email, password)) {
      this.toggleModal(null);
      this.isLoggedIn = true;
      this.currentUser = this.loginService.getCurrentUser();
      this.router.navigate(['/']);
    } else {
      this.loginError = true;
    }
  }

  register() {
    this.registrationError = false;
    this.registrationSuccess = false;

    const email = this.registerForm.get('email')?.value;
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;
    const username = this.registerForm.get('username')?.value;

    if (this.loginService.isEmailTaken(email)) {
      this.registrationError = true;
      return;
    }

    if (this.loginService.isUsernameTaken(username)) {
      this.registrationError = true;
      return;
    }

    if (password !== confirmPassword) {
      this.registrationError = true;
      return;
    }

    if (this.registerForm.invalid) {
      this.registrationError = true;
      return;
    }

    this.registrationSuccess = true;
    this.registrationError = false;
  }

  recoverPassword() {
    const email = this.recoveryForm.get('email')?.value;

    if (this.loginService.isEmailTaken(email)) {
      this.recoverySuccess = true;
      this.recoveryError = false;
    } else {
      this.recoveryError = true;
      this.recoverySuccess = false;
    }
  }

  logout() {
    this.loginService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const isClickInsideModal =
      this.loginModal?.nativeElement.contains(target) ||
      this.registerModal?.nativeElement.contains(target) ||
      this.recoveryModal?.nativeElement.contains(target);

    const isClickOnOverlay = target.classList.contains('overlay');

    if (!isClickInsideModal && isClickOnOverlay) {
      this.toggleModal(null);
    }
  }
}
