import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import leaflet from 'leaflet';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { icon, Marker } from 'leaflet';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map-tab',
  templateUrl: './map-tab.page.html',
  styleUrls: ['./map-tab.page.scss'],
})
export class MapTabPage implements OnInit {
  map: any;
  lat: any;
  long: any;
  constructor(public geo: Geolocation) {

  }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.loadLeafletMap();
  }

  loadLeafletMap() {
      this.geo.getCurrentPosition().then(pos => {
        this.lat = pos.coords.latitude;
        this.long = pos.coords.longitude;

        if(this.map !== undefined) {
          this.map.off();
          this.map.remove();
        }

        this.map = leaflet.map('map').setView([this.lat, this.long], 16); 

        leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          zoomControl: true
        })
        .addTo(this.map);

        leaflet.marker([this.lat, this.long]).addTo(this.map);
      })
      .catch(err => console.log(err));
  }
}
