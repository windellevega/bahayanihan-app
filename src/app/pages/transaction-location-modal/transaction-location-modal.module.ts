import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionLocationModalPage } from './transaction-location-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [TransactionLocationModalPage],
  entryComponents: [TransactionLocationModalPage]
})
export class TransactionLocationModalPageModule {}
