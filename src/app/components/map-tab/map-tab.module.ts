import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MapTabPage } from './map-tab.page';

import { WorkerinfoModalPageModule } from '../workerinfo-modal/workerinfo-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: MapTabPage }]),
    WorkerinfoModalPageModule
  ],
  providers: [],
  declarations: [MapTabPage]
})
export class MapTabPageModule {}
