import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  lat: any;
  long: any;
  map: any;

  constructor(
    private userService: UserService,
    private geo: Geolocation) {}

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
