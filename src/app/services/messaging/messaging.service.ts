import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  private pusherClient: Pusher;
  constructor() { 
    this.pusherClient = new Pusher('5d48753513e0ef60a4d1', { cluster: 'ap1'});
  }
}
