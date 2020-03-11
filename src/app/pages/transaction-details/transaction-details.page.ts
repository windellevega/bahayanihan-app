import { TransactionService } from 'src/app/services/transaction/transaction.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TransactionLocationModalPage } from '../transaction-location-modal/transaction-location-modal.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.page.html',
  styleUrls: ['./transaction-details.page.scss'],
})
export class TransactionDetailsPage implements OnInit {
  transactionId: any;
  transactionDetails: any;
  isWorker: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private transactionService: TransactionService,
    private modalController: ModalController) { }

  ngOnInit() {
    this.transactionId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getTransactionDetails(this.transactionId);
    this.isWorker = localStorage.getItem('is_worker');
  }

  getTransactionDetails(transactionId) {
    this.transactionService.getTransaction(transactionId)
    .subscribe(data => {
      this.transactionDetails = data;
      console.log(this.transactionDetails);
    });
  }

  async showTransactionLocationModal() {
    const modal = await this.modalController.create({
      component: TransactionLocationModalPage,
      cssClass: 'transaction-location-modal',
      componentProps: {
        transactionLong: this.transactionDetails.transaction_long,
        transactionLat: this.transactionDetails.transaction_lat
      }
    });
    await modal.present();
  }
}
