import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private users = [
    { username: 'dani@pesao.com', password: 'pesado', role: 'admin'},
    { username: 'develop', password: 'develop', role: 'develop'},
    { username: 'visitor', password: 'visitor', role: 'visitor'}
  ]
  private currentUser: any = null;

  constructor() { }

  login(username: string, password: string) {
    const user = this.users.find( u => u.username === username && u.password === password);
    if (user) {
      this.currentUser = user;
      return true;
    }
    return false;
  }

  logOut() {
    this.currentUser = null;
  }

  isLoggedIn() {
    return this.currentUser !== null;
  }

  getRole() {
    return this.currentUser ? this.currentUser.role : null;
  }

}
