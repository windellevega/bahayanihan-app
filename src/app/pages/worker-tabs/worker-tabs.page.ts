import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-worker-tabs',
  templateUrl: './worker-tabs.page.html',
  styleUrls: ['./worker-tabs.page.scss'],
})
export class WorkerTabsPage implements OnInit {

  constructor(
    private userService: UserService,
    private geo: Geolocation) { }

  ngOnInit() {
    this.updateUserLocation();
  }

  updateUserLocation() {
    this.geo.getCurrentPosition().then(pos => {
      this.userService.updateUserLocation(pos.coords.latitude, pos.coords.longitude).subscribe();
    })
    .catch(err => {
      alert('Your location is not enabled');
    });
  }
}
