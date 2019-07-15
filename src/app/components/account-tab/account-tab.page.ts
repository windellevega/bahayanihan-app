import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../services/auth/user-auth.service';
import { UserService } from '../../services/user/user.service';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/interfaces/user.interface';


@Component({
  selector: 'app-account-tab',
  templateUrl: 'account-tab.page.html',
  styleUrls: ['account-tab.page.scss']
})
export class AccountTabPage implements OnInit{

  userProfile: IUser;
  constructor(
    private userAuthService: UserAuthService,
    private userService: UserService,
    private router: Router) {}

  ngOnInit() {
    this.getOwnProfile();
  }

  logout() {
    this.userAuthService.logout();
    this.router.navigate(['/']);
  }

  getOwnProfile() {
    this.userService.getOwnProfile()
      .subscribe(data => {
        this.userProfile = data;
        this.userProfile.mobile_number = this.userService.formatMobileNumber(data.mobile_number);
      });
  }
}
