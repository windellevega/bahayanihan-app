import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import leaflet from 'leaflet';
import { icon, Marker } from 'leaflet';

const iconRetinaUrl = 'assets/marker_icons/marker-icon-2x.png';
const iconUrl = 'assets/marker_icons/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [45, 45],
  iconAnchor: [12, 45],
  shadowSize: [50, 50],
  shadowAnchor: [5, 50]
});
Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-transaction-location-modal',
  templateUrl: './transaction-location-modal.page.html',
  styleUrls: ['./transaction-location-modal.page.scss'],
})
export class TransactionLocationModalPage implements OnInit {

  @Input() transactionLong: any;
  @Input() transactionLat: any;
  map: any;
  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadLeafletMap();
  }

  async dismissModal() {
    const modal = await this.modalController.getTop();
    await modal.dismiss();
  }

  loadLeafletMap() {
    if (this.map !== undefined) {
      this.map.off();
      this.map.remove();
    }

    this.map = leaflet.map('transaction-location').setView([this.transactionLat, this.transactionLong], 16);

    leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      zoomControl: true
    })
    .addTo(this.map);

    leaflet.marker([this.transactionLat, this.transactionLong]).addTo(this.map);
    setTimeout(() => {
      this.map.invalidateSize();
    }, 0);
  }
}
