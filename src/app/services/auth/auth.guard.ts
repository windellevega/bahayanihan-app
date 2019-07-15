import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserAuthService } from './user-auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private userAuthService: UserAuthService) {}

  canActivate() {
    if (!this.userAuthService.isTokenExpired()) {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}
