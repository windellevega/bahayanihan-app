import { Component, OnInit } from '@angular/core';
import { MessagingService } from 'src/app/services/messaging/messaging.service';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-message-logs',
  templateUrl: './message-logs.page.html',
  styleUrls: ['./message-logs.page.scss'],
})
export class MessageLogsPage {

  conversations: any;
  userId = 0;
  isWorker: any;

  constructor(
    private messagingService: MessagingService,
    private loadingController: LoadingController,
    private navCtrl: NavController) { }

  ionViewWillEnter() {
    this.conversations = [];
    console.log(this.conversations);
    this.isWorker = localStorage.getItem('is_worker');
    this.loadConversations();
  }

  loadConversations() {
    this.showConversationsLoading();

    this.messagingService.getConversations()
      .subscribe(data => {
        console.log(data.conversations);
        this.userId = data.id;
        this.conversations = data.conversations;
        this.listenToMessagingUserChannel(data.id);
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

  loadMessages(conversationId, toUserId, otherUserFirstname, otherUserPic) {
    this.navCtrl.navigateRoot(['/messaging'], {
        queryParams: {
          conversationId,
          fromUserId: this.userId,
          toUserId,
          otherUserFirstname,
          otherUserPic
        }
      });
  }

  listenToMessagingUserChannel(userId) {
    this.messagingService.listenNewMessageUserChannel(userId)
      .subscribe(message => {
        if (message !== '') {
          this.conversations.find(conversation => {
            if (conversation.id === message.conversation_id && conversation.latest_message.id !== message.id) {
              conversation.latest_message = message;
              conversation.unread_messages_count++;
            }
          });
        }
      });
  }

  ionViewWillLeave() {
    this.messagingService.leaveNewMessageUserChannel(this.userId);
  }
}
