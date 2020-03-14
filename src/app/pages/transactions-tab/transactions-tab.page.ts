import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction/transaction.service';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-transactions-tab',
  templateUrl: 'transactions-tab.page.html',
  styleUrls: ['transactions-tab.page.scss']
})
export class TransactionsTabPage implements OnInit {

  transactions: any;
  isWorker: any;
  constructor(
    private navController: NavController,
    private transactionService: TransactionService,
    private loadingController: LoadingController) {}

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
    this.navController.navigateRoot(['/transaction-details/' + transactionId]);
  }
}
