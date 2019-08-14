import { Injectable } from '@angular/core';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { IMessage } from 'src/app/interfaces/message.interface';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  echo: any;
  message$ = new BehaviorSubject<any>('');

  constructor(
    private httpClient: HttpClient
  ) {
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
    console.log(this.echo);
  }

  listenNewMessage(id): Observable<any> {
    console.log('Listening to conversation.' + id + ' channel...');
    this.echo.private('conversation.' + id)
      .listen('NewMessage', (message) => {
        this.message$.next(message);
      });
    return this.message$.asObservable();
  }

  getConversations(): Observable<any> {
    return this.httpClient.get<any>(environment.apiUrl + '/api/conversations')
      .pipe();
  }

  getMessages(conversationId): Observable<any> {
    return this.httpClient.get<any>(environment.apiUrl + '/api/conversation/' + conversationId)
      .pipe();
  }

  sendMessageToConversation(conversationId, message): Observable<any> {
    return this.httpClient.post<any>(environment.apiUrl + '/api/message', {
      conversation_id: conversationId,
      message: message
    }).pipe();
  }
}
