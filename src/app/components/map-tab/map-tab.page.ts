import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Map, latLng, tileLayer, Layer, marker } from 'leaflet';

@Component({
  selector: 'app-map-tab',
  templateUrl: './map-tab.page.html',
  styleUrls: ['./map-tab.page.scss'],
})
export class MapTabPage implements OnInit {
  map: Map;

  ionViewDidEnter() {
    this.loadLeafletMap();
  }

  ngOnInit() {

  }

  loadLeafletMap() {
    this.map = new Map('map').setView([28.644800, 77.216721], 10);
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      zoomControl: true
    }).addTo(this.map);
  }
}
