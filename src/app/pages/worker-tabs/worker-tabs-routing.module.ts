import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkerTabsPage } from './worker-tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: WorkerTabsPage,
    children: [
      {
        path: 'transactions-tab',
        children: [
          {
            path: '',
            loadChildren: () => import('../transactions-tab/transactions-tab.module').then(m => m.TransactionsTabPageModule)
          }
        ]
      },
      {
        path: 'account-tab',
        children: [
          {
            path: '',
            loadChildren: () => import('../account-tab/account-tab.module').then(m => m.AccountTabPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/worker-main/tabs/transactions-tab',
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
