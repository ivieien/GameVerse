import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  
  constructor(private loginService: LoginService, private router : Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const expectedRole = route.data['expectedRole'];
    const currentRole = this.loginService.getRole();

    if(!this.loginService.isLoggedIn() || currentRole !== expectedRole) {
      this.router.navigate(['/unauthorized']);
      return false
    }
    return true;
  }
}
