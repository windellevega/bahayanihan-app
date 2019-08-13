import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MessageLogsPage } from './message-logs.page';
import { MessagingService } from 'src/app/services/messaging/messaging.service';

const routes: Routes = [
  {
    path: '',
    component: MessageLogsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers: [MessagingService],
  declarations: [MessageLogsPage]
})
export class MessageLogsPageModule {}
