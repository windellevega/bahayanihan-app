import { Component, OnInit, ViewChild } from '@angular/core';
import { MessagingService } from 'src/app/services/messaging/messaging.service';
import { ActivatedRoute } from '@angular/router';
import { IMessage } from 'src/app/interfaces/message.interface';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.page.html',
  styleUrls: ['./messaging.page.scss'],
})
export class MessagingPage implements OnInit {
  newMessage: string = '';
  conversationId: number = 0;
  userId: number = 0;
  otherUserFirstname: string = '';
  otherUserPic: string = '';
  messages: IMessage[];

  constructor(
    private messagingService: MessagingService,
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.conversationId = Number(this.activatedRoute.snapshot.queryParamMap.get('conversationId'));
    this.userId = Number(this.activatedRoute.snapshot.queryParamMap.get('userId'));
    this.otherUserFirstname = this.activatedRoute.snapshot.queryParamMap.get('otherUserFirstname');
    this.otherUserPic = this.activatedRoute.snapshot.queryParamMap.get('otherUserPic');
    this.messagingService.listenNewMessage(this.conversationId);
    this.getMessages();
    console.log(this.conversationId, this.userId);
  }

  async getMessages() {
    this.showMessagesLoading();

    await this.messagingService.getMessages(this.conversationId)
      .subscribe(data => {
        this.messages = data.messages;
        console.log(this.messages);
        this.hideMessagesLoading();
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
    this.messages.push({
      conversation_id: this.conversationId,
      from_user_id: this.userId,
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
  }
}
