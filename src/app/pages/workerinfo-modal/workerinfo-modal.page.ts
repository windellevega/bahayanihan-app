import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { IUser } from 'src/app/interfaces/user.interface';
import { Router } from '@angular/router';
import { MessagingService } from 'src/app/services/messaging/messaging.service';

@Component({
  selector: 'app-workerinfo-modal',
  templateUrl: './workerinfo-modal.page.html',
  styleUrls: ['./workerinfo-modal.page.scss'],
})
export class WorkerinfoModalPage implements OnInit {

  @Input() workerInfo: IUser;
  @Input() skillNeeded = 0;
  @Input() userInfo: IUser;

  rate: any = 5;

  constructor(
    private modalController: ModalController,
    private router: Router,
    private navCtrl: NavController,
    private messagingService: MessagingService) {

    }

  ngOnInit() {

  }

  async dismissModal() {
    const modal = await this.modalController.getTop();
    await modal.dismiss();
  }

  onRateChange($event) {

  }

  navigateToTransactionForm() {
    this.router.navigate(['/transaction-form'], {
      state: {
        workerInfo: this.workerInfo,
        skillNeeded: this.skillNeeded
      }
    });
    this.dismissModal();
  }

  getConversation() {
    this.dismissModal();
    this.messagingService.getConversationWithUser(this.workerInfo.id).subscribe(data => {
      if (Object.keys(data).length === 0) {
        this.navigateToMessaging(0, this.userInfo.id, this.workerInfo.id,
          this.workerInfo.firstname, this.workerInfo.profile_picture_url);
      } else {
        this.navigateToMessaging(data[0].id, this.userInfo.id, this.workerInfo.id,
          this.workerInfo.firstname, this.workerInfo.profile_picture_url);
      }
    });
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
