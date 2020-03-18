import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { UserService } from 'src/app/services/user/user.service';
import { MessagingService } from 'src/app/services/messaging/messaging.service';
import { UserAuthService } from 'src/app/services/auth/user-auth.service';

@Component({
  selector: 'app-worker-tabs',
  templateUrl: './worker-tabs.page.html',
  styleUrls: ['./worker-tabs.page.scss'],
})
export class WorkerTabsPage {

  conversationsWithUnreadCount = 0;
  constructor(
    private userService: UserService,
    private geo: Geolocation,
    private messagingService: MessagingService,
    private userAuthService: UserAuthService) { }

  ionViewWillEnter() {
    this.updateUserLocation();
    this.getConversationsWithUnread();
    this.messagingService.leaveNewMessageUserChannel(this.userAuthService.getUserIdFomToken());
    this.listenToMessagingUserChannel(this.userAuthService.getUserIdFomToken());
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
    this.messagingService.listenNewMessageUserChannel(userId)
      .subscribe(message => {
        if (message !== '') {
          this.getConversationsWithUnread();
        }
      });
  }
}
