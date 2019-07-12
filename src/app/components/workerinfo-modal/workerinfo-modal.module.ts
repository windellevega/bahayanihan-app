import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkerinfoModalPage } from './workerinfo-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [WorkerinfoModalPage],
  entryComponents: [WorkerinfoModalPage]
})
export class WorkerinfoModalPageModule {}
