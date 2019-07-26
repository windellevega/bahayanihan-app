import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import leaflet from 'leaflet';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { icon, Marker } from 'leaflet';
import { ModalController } from '@ionic/angular';

import { WorkerinfoModalPage } from '../workerinfo-modal/workerinfo-modal.page';
import { UserService } from 'src/app/services/user/user.service';
import { IUser } from 'src/app/interfaces/user.interface';
import { ActivatedRoute } from '@angular/router';

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
  selector: 'app-map-tab',
  templateUrl: './map-tab.page.html',
  styleUrls: ['./map-tab.page.scss'],
})
export class MapTabPage implements OnInit {
  map: any;
  lat: any;
  long: any;
  skillId: number = 0;

  constructor(
    public geo: Geolocation,
    private modalController: ModalController,
    private userService: UserService,
    private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
   
  }

  ionViewWillEnter() {
    this.skillId = Number(this.activatedRoute.snapshot.queryParamMap.get('skillId'));
    this.activatedRoute.queryParamMap.subscribe(queryParams => {
      this.skillId = Number(queryParams.get('skillId'));
    });
    this.loadLeafletMap();
    //this.showWorkerInfoModal();
    this.getWorkers(this.skillId);
  }

  async showWorkerInfoModal(workerInfo: IUser) {
    const modal = await this.modalController.create({
      component: WorkerinfoModalPage,
      cssClass: 'workerinfo-modal',
      componentProps: {
        workerInfo: workerInfo
      }
    });
    await modal.present();
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
        //this.getWorkers();
        /*leaflet.marker([17.6070761, 121.7296232]).addTo(this.map).on('click', () => {
          this.showWorkerInfoModal();
        });
        leaflet.marker([17.644121, 121.764212]).addTo(this.map).on('click', () => {
          this.showWorkerInfoModal();
        });
        leaflet.marker([15.751979, 121.045666]).addTo(this.map).on('click', () => {
          this.showWorkerInfoModal();
        });*/
      })
      .catch(err => {
        alert('Your location is not enabled');
      });
  }

  async getWorkers(skillId) {
    await this.userService.getWorkers(skillId)
      .subscribe(workers => {
        for(let worker of workers) {
          console.log(workers);
          //alert(worker.firstname);
          worker.mobile_number = this.userService.formatMobileNumber(worker.mobile_number);
          leaflet.marker([worker.current_lat, worker.current_long]).addTo(this.map).on('click', () => {
            this.showWorkerInfoModal(worker);
            //alert('clicked');
          });
        }
      });
  }
}
