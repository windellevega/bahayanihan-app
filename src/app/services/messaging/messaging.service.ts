import { Injectable } from '@angular/core';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  echo: any;
  message$ = new BehaviorSubject<any>('');

  constructor(private httpClient: HttpClient) {
    const pusher = Pusher;
    this.echo = new Echo({
      broadcaster: 'pusher',
      key: '5d48753513e0ef60a4d1',
      cluster: 'ap1',
      authEndpoint: environment.apiUrl + '/broadcasting/auth',
      encrypted: true,
      auth: {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token')
        },
      },
    });
  }

  listenNewMessageConversationChannel(id): Observable<any> {
    console.log('Listening to conversation.' + id + ' channel...');
    this.echo.private('conversation.' + id)
      .listen('NewMessageConversation', (message) => {
        this.message$.next(message);
      });
    console.log(this.echo);
    return this.message$.asObservable();
  }

  listenNewMessageUserChannel(id): Observable<any> {
    console.log('Listening to message-log.' + id + ' channel...');
    this.echo.private('message-log.' + id)
      .listen('NewMessageUser', (message) => {
        this.message$.next(message);
      });
    console.log(this.echo);
    return this.message$.asObservable();
  }

  leaveNewMessageConversationChannel(id) {
    this.echo.leave('conversation.' + id);
  }

  leaveNewMessageUserChannel(id) {
    this.echo.leave('message-log.' + id);
  }

  getConversations(): Observable<any> {
    return this.httpClient.get<any>(environment.apiUrl + '/api/conversations')
      .pipe();
  }

  getMessages(conversationId): Observable<any> {
    return this.httpClient.get<any>(environment.apiUrl + '/api/conversation/' + conversationId)
      .pipe();
  }

  sendMessageToConversation(conversationId, message, toUserId): Observable<any> {
    if (conversationId === 0) {
      return this.httpClient.post<any>(environment.apiUrl + '/api/message', {
        message,
        to_user_id: toUserId
      }).pipe();
    }

    return this.httpClient.post<any>(environment.apiUrl + '/api/message', {
      conversation_id: conversationId,
      to_user_id: toUserId,
      message
    }).pipe();
  }

  getConversationWithUser(id) {
    return this.httpClient.get<any>(environment.apiUrl + '/api/conversation-with-user/' + id)
            .pipe();
  }

  markMessagesAsRead(conversationId, fromUserId) {
    return this.httpClient.put<any>(environment.apiUrl + '/api/messages/mark-as-read/' + conversationId, {
      from_user_id: fromUserId,
    }).pipe();
  }

  getConversationsWithUnread() {
    return this.httpClient.get<any>(environment.apiUrl + '/api/conversations/with-unread')
    .pipe();
  }
}
