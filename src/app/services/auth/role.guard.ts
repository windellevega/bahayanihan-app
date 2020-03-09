import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { UserAuthService } from './user-auth.service';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(
        private userAuthService: UserAuthService,
        private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;

    if (this.userAuthService.isTokenExpired() || expectedRole !== Number(localStorage.getItem('is_worker'))) {
        this.router.navigate(['/']);
        return false;
    }

    return true;
  }
}
