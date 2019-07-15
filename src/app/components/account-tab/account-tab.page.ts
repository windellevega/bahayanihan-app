import { Component } from '@angular/core';
import { UserAuthService } from '../../services/auth/user-auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-account-tab',
  templateUrl: 'account-tab.page.html',
  styleUrls: ['account-tab.page.scss']
})
export class AccountTabPage {

  constructor(
    private userAuthService: UserAuthService,
    private router: Router) {}

  logout() {
    this.userAuthService.logout();
    this.router.navigate(['/']);
  }
}
