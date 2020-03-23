import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction/transaction.service';
import { LoadingController, NavController, AlertController } from '@ionic/angular';
import { UserAuthService } from 'src/app/services/auth/user-auth.service';

@Component({
  selector: 'app-transactions-tab',
  templateUrl: 'transactions-tab.page.html',
  styleUrls: ['transactions-tab.page.scss']
})
export class TransactionsTabPage {

  transactions = [];
  isWorker: any;
  transactionSubscription: any;
  constructor(
    private navController: NavController,
    private transactionService: TransactionService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private userAuthService: UserAuthService) {}

  ionViewWillEnter() {
    this.isWorker = localStorage.getItem('is_worker');
    this.loadTransactions();

    if (this.isWorker === '1') {
      this.listenToNewTransactionChannel(this.userAuthService.getUserIdFomToken());
    }
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

  listenToNewTransactionChannel(userId) {
    this.transactionSubscription = this.transactionService.transaction$
      .subscribe(async transaction => {
        if (transaction !== '') {
          console.log(transaction);
          const alert = await this.alertController.create({
            header: 'New Task Received',
            message: 'A user has requested for your ' + transaction.skill.skill_name.toLowerCase() + ' service.',
            buttons: [
              {
                text: 'View Task',
                handler: () => {
                  this.transactions.unshift(transaction);
                  this.transactionService.transaction$.next('');
                }
              }
            ]
          });
          await alert.present();
        }
      });
  }

  ionViewWillLeave() {
    if (this.isWorker === '1') {
      this.transactionSubscription.unsubscribe();
    }
  }
}
