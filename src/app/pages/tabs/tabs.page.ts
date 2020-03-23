import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MessagingService } from 'src/app/services/messaging/messaging.service';
import { UserAuthService } from 'src/app/services/auth/user-auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  lat: any;
  long: any;
  map: any;
  conversationsWithUnreadCount = 0;
  messagingUserSubscription: any;
  userId = this.userAuthService.getUserIdFomToken();

  constructor(
    private userService: UserService,
    private geo: Geolocation,
    private messagingService: MessagingService,
    private userAuthService: UserAuthService) { }

  ionViewWillEnter() {
    this.updateUserLocation();
    this.getConversationsWithUnread();
    this.listenToMessagingUserChannel(this.userId);
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

  ionViewWillLeave() {
    this.messagingService.leaveNewMessageUserChannel(this.userId);
    this.messagingUserSubscription.unsubscribe();
  }
}
