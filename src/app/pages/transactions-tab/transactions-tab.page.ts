import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionService } from 'src/app/services/transaction/transaction.service';
import { LoadingController } from '@ionic/angular';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

@Component({
  selector: 'app-transactions-tab',
  templateUrl: 'transactions-tab.page.html',
  styleUrls: ['transactions-tab.page.scss']
})
export class TransactionsTabPage implements OnInit {

  transactions: any;
  isWorker: any;
  constructor(
    private router: Router,
    private transactionService: TransactionService,
    private loadingController: LoadingController,
    private nativeGeocoder: NativeGeocoder) {}

  ngOnInit() {
    this.isWorker = localStorage.getItem('is_worker');
  }

  ionViewWillEnter() {
    this.loadTransactions();
  }

  async loadTransactions() {
    this.showTransactionsLoading();

    await this.transactionService.getTransactions()
      .subscribe(data => {
        this.transactions = data;
        console.log(this.transactions);
        this.hideTransactionsLoading();
      });
  }

  async showTransactionsLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      spinner: 'lines',
      translucent: true
    });
    await loading.present();
  }

  async hideTransactionsLoading() {
    const loading = await this.loadingController.getTop();
    loading.dismiss();
  }

  loadTransactionDetails(transactionId) {
    this.router.navigate(['/transaction-details/' + transactionId]);
  }
}
