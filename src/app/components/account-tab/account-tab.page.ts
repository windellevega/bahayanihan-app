import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../services/auth/user-auth.service';
import { UserService } from '../../services/user/user.service';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/interfaces/user.interface';
import { LoadingController } from '@ionic/angular';


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
    private router: Router,
    private loadingController: LoadingController) {}

  ngOnInit() {
    this.getOwnProfile();
  }

  logout() {
    this.userAuthService.logout();
    this.router.navigate(['/']);
  }

  async getOwnProfile() {
    await this.showUserProfileLoading();

    this.userService.getOwnProfile()
      .subscribe(data => {
        this.userProfile = data;
        this.userProfile.mobile_number = this.userService.formatMobileNumber(data.mobile_number);
        
        this.hideUserProfileLoading();
      });
  }

  async showUserProfileLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading profile...',
      spinner: 'lines',
      translucent: true
    });
    await loading.present();
  }

  async hideUserProfileLoading() {
    const loading = await this.loadingController.getTop();
    loading.dismiss();
  }
}
