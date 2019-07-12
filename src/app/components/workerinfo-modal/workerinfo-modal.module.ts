import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkerinfoModalPage } from './workerinfo-modal.page';

import { IonicRatingModule } from 'ionic4-rating';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicRatingModule
  ],
  declarations: [WorkerinfoModalPage],
  entryComponents: [WorkerinfoModalPage]
})
export class WorkerinfoModalPageModule {}
