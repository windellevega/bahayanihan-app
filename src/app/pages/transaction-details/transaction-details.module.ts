import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionDetailsPage } from './transaction-details.page';
import { Routes, RouterModule } from '@angular/router';
import { TransactionLocationModalPageModule } from '../transaction-location-modal/transaction-location-modal.module';

const routes: Routes = [
  {
    path: '',
    component: TransactionDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TransactionLocationModalPageModule
  ],
  declarations: [TransactionDetailsPage]
})
export class TransactionDetailsPageModule {}
