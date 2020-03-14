import { Component, OnInit, ViewChild } from '@angular/core';
import { MessagingService } from 'src/app/services/messaging/messaging.service';
import { ActivatedRoute } from '@angular/router';
import { IMessage } from 'src/app/interfaces/message.interface';
import { LoadingController, IonContent } from '@ionic/angular';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.page.html',
  styleUrls: ['./messaging.page.scss'],
})
export class MessagingPage implements OnInit {
  newMessage = '';
  conversationId = 0;
  fromUserId = 0;
  toUserId = 0;
  otherUserFirstname = '';
  otherUserPic = '';
  messages: IMessage[] = [];

  constructor(
    private messagingService: MessagingService,
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController
  ) { }

  @ViewChild(IonContent, { static: true }) content: IonContent;

  ngOnInit() {
    this.conversationId = Number(this.activatedRoute.snapshot.queryParamMap.get('conversationId'));
    this.fromUserId = Number(this.activatedRoute.snapshot.queryParamMap.get('fromUserId'));
    this.toUserId = Number(this.activatedRoute.snapshot.queryParamMap.get('toUserId'));
    this.otherUserFirstname = this.activatedRoute.snapshot.queryParamMap.get('otherUserFirstname');
    this.otherUserPic = this.activatedRoute.snapshot.queryParamMap.get('otherUserPic');

    if (this.conversationId !== 0) {
      this.listenToMessagingChannel();
      this.getMessages();
    }

    console.log(this.conversationId, this.fromUserId);
  }

  async getMessages() {
    this.showMessagesLoading();

    await this.messagingService.getMessages(this.conversationId)
      .subscribe(data => {
        this.messages = data.messages;
        console.log(this.messages);
        this.hideMessagesLoading();
        setTimeout(() => {
          this.content.scrollToBottom(200);
        });
      });
  }

  listenToMessagingChannel() {
    this.messagingService.listenNewMessage(this.conversationId)
      .subscribe(message => {
          if (message !== '') {
            console.log(message);
            if (message.from_user_id !== this.fromUserId) {
              this.messages.push(message);
            }
            setTimeout(() => {
              this.content.scrollToBottom(200);
            });
          }
      });
  }

  async showMessagesLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      spinner: 'lines',
      translucent: true
    });
    await loading.present();
  }

  async hideMessagesLoading() {
    const loading = await this.loadingController.getTop();
    loading.dismiss();
  }

  sendMessage() {
    this.messagingService.sendMessageToConversation(this.conversationId, this.newMessage, this.toUserId).subscribe();
    this.messages.push({
      conversation_id: this.conversationId,
      from_user_id: this.fromUserId,
      message: this.newMessage,
      is_read: false,
      created_at: new Date(),
      user: {
        id: 0,
        firstname: '',
        lastname: '',
        profile_picture_url: ''
      }
    });
    this.newMessage = '';

    setTimeout(() => {
      this.content.scrollToBottom(300);
    });
  }

}
