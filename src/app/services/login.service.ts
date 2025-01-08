import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private users = [
    { email: 'admin@gmail.com', password: 'admin', username: 'admin', role: 'admin' },
    { email: 'visitor@gmail.com', password: 'visitor', username: 'visitor', role: 'visitor' }
  ];

  private currentUser: any = null;
  private openLoginModalSubject = new BehaviorSubject<boolean>(false);
  openLogin = this.openLoginModalSubject.asObservable();

  constructor() {}

  login(email: string, password: string) {
    const user = this.users.find(user => user.email === email && user.password === password);
    if (user) {
      this.currentUser = user;
      return true;
    }
    return false;
  }

  isEmailTaken(email: string): boolean {
    return this.users.some(user => user.email === email);
  }

  isUsernameTaken(username: string): boolean {
    return this.users.some(user => user.username === username);
  }

  isLoggedIn() {
    return this.currentUser !== null;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  getRole() {
    return this.currentUser ? this.currentUser.role : null;
  }

  logout() {
    this.currentUser = null;
  }

  openLoginModal() {
    this.openLoginModalSubject.next(true);
  }
}
