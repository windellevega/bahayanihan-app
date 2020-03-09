import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkerTabsPage } from './worker-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: WorkerTabsPage,
    children: [
      {
        path: 'transactions-tab',
        children: [
          {
            path: '',
            loadChildren: '../transactions-tab/transactions-tab.module#TransactionsTabPageModule'
          }
        ]
      },
      {
        path: 'account-tab',
        children: [
          {
            path: '',
            loadChildren: '../account-tab/account-tab.module#AccountTabPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/worker-main/transactions-tab',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkerTabsPageRoutingModule {}
