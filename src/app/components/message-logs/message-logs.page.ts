import { Component, OnInit } from '@angular/core';
import { MessagingService } from 'src/app/services/messaging/messaging.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-message-logs',
  templateUrl: './message-logs.page.html',
  styleUrls: ['./message-logs.page.scss'],
})
export class MessageLogsPage implements OnInit {

  conversations: any;
  userId: number = 0;

  constructor(
    private messagingService: MessagingService,
    private loadingController: LoadingController,
    private router: Router) { }

  ngOnInit() {
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
    this.router.navigate(['/messaging'], {
        queryParams: {
          conversationId: conversationId,
          userId: this.userId,
          otherUserFirstname: otherUserFirstname,
          otherUserPic: otherUserPic
        }
      });
  }
}
