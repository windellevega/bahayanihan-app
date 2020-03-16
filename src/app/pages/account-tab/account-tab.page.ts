import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../services/auth/user-auth.service';
import { UserService } from '../../services/user/user.service';
import {Router, ActivatedRoute} from '@angular/router';
import { IUser } from 'src/app/interfaces/user.interface';
import { LoadingController } from '@ionic/angular';
import { MessagingService } from 'src/app/services/messaging/messaging.service';


@Component({
  selector: 'app-account-tab',
  templateUrl: 'account-tab.page.html',
  styleUrls: ['account-tab.page.scss']
})
export class AccountTabPage {

  userProfile: IUser;
  messageLogsCount = 0;

  constructor(
    private userAuthService: UserAuthService,
    private userService: UserService,
    private router: Router,
    private loadingController: LoadingController,
    private messagingService: MessagingService) {}

  ionViewWillEnter() {
    this.getOwnProfile();
    this.getConversationsWithUnread();
  }

  logout() {
    this.userAuthService.logout();
    this.router.navigate(['/']);
  }

  async getOwnProfile() {
    await this.showUserProfileLoading();

    await this.userService.getOwnProfile()
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

  getConversationsWithUnread() {
    this.messagingService.getConversationsWithUnread()
      .subscribe(data => {
        this.messageLogsCount = data.conversations_with_unread;
      });
  }
}
