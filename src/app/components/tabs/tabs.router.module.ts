import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'workers-tab',
        children: [
          {
            path: '',
            loadChildren: '../workers-tab/workers-tab.module#WorkersTabPageModule'
          }
        ]
      },
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
        redirectTo: '/tabs/workers-tab',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/workers-tab',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
