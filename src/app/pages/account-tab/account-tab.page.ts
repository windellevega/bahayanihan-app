import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../services/auth/user-auth.service';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/user.interface';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { MessagingService } from 'src/app/services/messaging/messaging.service';
import { TransactionService } from 'src/app/services/transaction/transaction.service';


@Component({
  selector: 'app-account-tab',
  templateUrl: 'account-tab.page.html',
  styleUrls: ['account-tab.page.scss']
})
export class AccountTabPage {

  messageLogsCount = 0;
  userProfile: IUser;
  isWorker: any;
  transactionSubscription: any;
  messagingUserSubscription: any;

  constructor(
    private userAuthService: UserAuthService,
    private userService: UserService,
    private router: Router,
    private loadingController: LoadingController,
    private messagingService: MessagingService,
    private transactionService: TransactionService,
    private alertController: AlertController,
    private navController: NavController) { }

  ionViewWillEnter() {
    this.isWorker = localStorage.getItem('is_worker');
    this.getOwnProfile();
    this.getConversationsWithUnread();
    this.listenToMessagingUserChannel();

    if (this.isWorker === '1') {
      this.listenToNewTransactionChannel();
    }
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
        console.log(data.conversations_with_unread);
        this.messageLogsCount = data.conversations_with_unread;
      });
  }

  listenToMessagingUserChannel() {
    this.messagingUserSubscription = this.messagingService.messageUser$
      .subscribe(message => {
        if (message !== '') {
          this.getConversationsWithUnread();
        }
      });
  }

  listenToNewTransactionChannel() {
    this.transactionSubscription = this.transactionService.transaction$
      .subscribe(async transaction => {
        if (transaction !== '') {
          console.log(transaction);
          const alert = await this.alertController.create({
            header: 'New Task Received',
            message: 'A user has requested for your ' + transaction.skill.skill_name + 'service.',
            buttons: [
              {
                text: 'View Later',
                role: 'cancel',
                cssClass: 'secondary',
              },
              {
                text: 'View Tasks',
                handler: () => {
                  this.transactionService.transaction$.next('');
                  this.navController.navigateRoot(['worker-main/tabs/transactions-tab']);
                }
              }
            ]
          });
          await alert.present();
        }
      });
  }

  ionViewWillLeave() {
    if (this.isWorker === '1') {
      this.transactionSubscription.unsubscribe();
    }
    this.messagingUserSubscription.unsubscribe();
  }
}
