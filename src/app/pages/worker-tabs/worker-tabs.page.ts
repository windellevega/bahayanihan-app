import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { UserService } from 'src/app/services/user/user.service';
import { MessagingService } from 'src/app/services/messaging/messaging.service';
import { UserAuthService } from 'src/app/services/auth/user-auth.service';
import { TransactionService } from 'src/app/services/transaction/transaction.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-worker-tabs',
  templateUrl: './worker-tabs.page.html',
  styleUrls: ['./worker-tabs.page.scss'],
})
export class WorkerTabsPage {

  conversationsWithUnreadCount = 0;
  userId = 0;
  messagingUserSubscription: any;
  newTransactionSubscription: any;

  constructor(
    private userService: UserService,
    private geo: Geolocation,
    private messagingService: MessagingService,
    private userAuthService: UserAuthService,
    private transactionService: TransactionService) { }

  ionViewWillEnter() {
    this.userId = this.userAuthService.getUserIdFomToken();
    this.updateUserLocation();
    this.getConversationsWithUnread();
    this.listenToMessagingUserChannel(this.userId);
    this.listenToNewTransactionChannel(this.userId);
  }

  updateUserLocation() {
    this.geo.getCurrentPosition().then(pos => {
      this.userService.updateUserLocation(pos.coords.latitude, pos.coords.longitude).subscribe();
    })
    .catch(err => {
      alert('Your location is not enabled');
    });
  }

  getConversationsWithUnread() {
    this.messagingService.getConversationsWithUnread()
      .subscribe(data => {
        console.log(data.conversations_with_unread);
        this.conversationsWithUnreadCount = data.conversations_with_unread;
      });
  }

  listenToMessagingUserChannel(userId) {
    this.messagingUserSubscription = this.messagingService.listenNewMessageUserChannel(userId)
      .subscribe(message => {
        if (message !== '') {
          this.getConversationsWithUnread();
        }
      });
  }

  listenToNewTransactionChannel(userId) {
    this.newTransactionSubscription = this.transactionService.listenNewTransactionChannel(userId)
      .subscribe();
  }

  ionViewWillLeave() {
    this.messagingService.leaveNewMessageUserChannel(this.userId);
    this.messagingUserSubscription.unsubscribe();
    this.transactionService.leaveNewTransactionChannel(this.userId);
    this.newTransactionSubscription.unsubscribe();
  }
}
