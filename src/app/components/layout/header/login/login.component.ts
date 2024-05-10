import { Component, ElementRef, HostListener, Inject, OnInit  } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  showModal: boolean = false;
 
  constructor(private elementRef: ElementRef) {}

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

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    console.log('Clicked outside');
    if (!this.elementRef.nativeElement.querySelector('.popUp').contains(event.target)) {
      this.closeModal();
    }
  }
  
}
