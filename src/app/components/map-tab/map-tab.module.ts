import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MapTabPage } from './map-tab.page';

import { WorkerinfoModalPageModule } from '../workerinfo-modal/workerinfo-modal.module';

import { Geolocation } from '@ionic-native/geolocation/ngx';

import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: MapTabPage }]),
    WorkerinfoModalPageModule
  ],
  providers: [
    Geolocation,
    AndroidPermissions,
    LocationAccuracy
  ],
  declarations: [MapTabPage]
})
export class MapTabPageModule {}
