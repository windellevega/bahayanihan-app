import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkerTabsPageRoutingModule } from './worker-tabs-routing.module';

import { WorkerTabsPage } from './worker-tabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkerTabsPageRoutingModule
  ],
  declarations: [WorkerTabsPage]
})
export class WorkerTabsPageModule {}
