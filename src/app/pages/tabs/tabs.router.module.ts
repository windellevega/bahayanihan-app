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
        path: 'map-tab/:skillId',
        children: [
          {
            path: '',
            loadChildren: '../map-tab/map-tab.module#MapTabPageModule'
          }
        ]
      },
      {
        path: 'map-tab',
        children: [
          {
            path: '',
            loadChildren: '../map-tab/map-tab.module#MapTabPageModule'
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
        redirectTo: '/main/tabs/workers-tab',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '/main/tabs',
    redirectTo: '/main/tabs/workers-tab',
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
