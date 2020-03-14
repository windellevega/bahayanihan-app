import { Component, OnInit } from '@angular/core';
import { MessagingService } from 'src/app/services/messaging/messaging.service';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-message-logs',
  templateUrl: './message-logs.page.html',
  styleUrls: ['./message-logs.page.scss'],
})
export class MessageLogsPage implements OnInit {

  conversations: any;
  userId = 0;
  isWorker: any;

  constructor(
    private messagingService: MessagingService,
    private loadingController: LoadingController,
    private navCtrl: NavController) { }

  ngOnInit() {
    this.isWorker = localStorage.getItem('is_worker');
    this.loadConversations();
  }

  async loadConversations() {
    this.showConversationsLoading();

    await this.messagingService.getConversations()
      .subscribe(data => {
        console.log(data);
        this.userId = data.id;
        this.conversations = data.conversations;
        this.hideConversationsLoading();
      });
  }

  async showConversationsLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      spinner: 'lines',
      translucent: true
    });
    await loading.present();
  }

  async hideConversationsLoading() {
    const loading = await this.loadingController.getTop();
    loading.dismiss();
  }

  loadMessages(conversationId, otherUserFirstname, otherUserPic) {
    this.navCtrl.navigateRoot(['/messaging'], {
        queryParams: {
          conversationId,
          fromUserId: this.userId,
          toUserId: 0,
          otherUserFirstname,
          otherUserPic
        }
      });
  }
}
