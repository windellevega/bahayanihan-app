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
            loadChildren: () => import('../categories-tab/categories-tab.module').then(m => m.CategoriesTabPageModule)
          }
        ]
      },
      {
        path: 'map-tab',
        children: [
          {
            path: '',
            loadChildren: () => import('../map-tab/map-tab.module').then(m => m.MapTabPageModule)
          }
        ]
      },
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
