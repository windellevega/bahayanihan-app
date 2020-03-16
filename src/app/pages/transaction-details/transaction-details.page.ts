import { TransactionService } from 'src/app/services/transaction/transaction.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TransactionLocationModalPage } from '../transaction-location-modal/transaction-location-modal.page';
import { ModalController, AlertController, Platform, NavController } from '@ionic/angular';
import { MessagingService } from 'src/app/services/messaging/messaging.service';

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
    private modalController: ModalController,
    private alertController: AlertController,
    private messagingService: MessagingService,
    private navCtrl: NavController) {
    }

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

  async updateStatus(statusId) {
    let message;
    if (statusId === 2) {
      message = 'You are about to accept this transaction.';
    } else if (statusId === 5) {
      message = 'You are about to reject this transaction.';
    } else if (statusId === 3) {
      message = 'You are about to mark this transaction as finished.';
    } else if (statusId === 4) {
      message = 'You are about to mark this transaction as paid.';
    }

    const alert = await this.alertController.create({
      header: 'Confirm Action',
      message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Okay',
          handler: () => {
            this.transactionService.updateTransactionStatus(this.transactionDetails.id, statusId)
            .subscribe(data => {
              this.getTransactionDetails(this.transactionId);
              console.log(data);
            });
          }
        }
      ]
    });
    await alert.present();
  }

  getConversation() {
    if (this.isWorker === '1') {
      this.messagingService.getConversationWithUser(this.transactionDetails.hailer.id).subscribe(data => {
        if (Object.keys(data).length === 0) {
          this.navigateToMessaging(0, this.transactionDetails.worker_id, this.transactionDetails.hailer_id,
            this.transactionDetails.hailer.firstname, this.transactionDetails.hailer.profile_picture_url);
        } else {
          this.navigateToMessaging(data.id, this.transactionDetails.worker_id, this.transactionDetails.hailer_id,
            this.transactionDetails.hailer.firstname, this.transactionDetails.hailer.profile_picture_url);
        }
      });
    } else {
      this.messagingService.getConversationWithUser(this.transactionDetails.worker.id).subscribe(data => {
        if (Object.keys(data).length === 0) {
          this.navigateToMessaging(0, this.transactionDetails.hailer_id, this.transactionDetails.worker_id,
            this.transactionDetails.worker.firstname, this.transactionDetails.worker.profile_picture_url);
        } else {
          this.navigateToMessaging(data.id, this.transactionDetails.hailer_id, this.transactionDetails.worker_id,
            this.transactionDetails.worker.firstname, this.transactionDetails.worker.profile_picture_url);
        }
      });
    }
  }

  navigateToMessaging(conversationId, fromUserId, toUserId, otherUserFirstname, otherUserPic) {
    this.navCtrl.navigateRoot(['/messaging'], {
      queryParams: {
        conversationId,
        fromUserId,
        toUserId,
        otherUserFirstname,
        otherUserPic
      }
    });
  }
}
