import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MessagingService } from 'src/app/services/messaging/messaging.service';
import { Router } from '@angular/router';

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

  constructor(
    private userService: UserService,
    private geo: Geolocation,
    private messagingService: MessagingService,
    private router: Router) {}

  ionViewWillEnter() {
    this.updateUserLocation();
    this.getConversationsWithUnread();
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
}
