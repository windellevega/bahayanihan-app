import { RoleGuard } from './services/auth/role.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'main', loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule), canActivate: [RoleGuard], data: { expectedRole: 0} },
  { path: '', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) },
  { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule) },
  { path: 'messaging', loadChildren: () => import('./pages/messaging/messaging.module').then(m => m.MessagingPageModule) },
  { path: 'message-logs', loadChildren: () => import('./pages/message-logs/message-logs.module').then(m => m.MessageLogsPageModule) },
  { path: 'transaction-form', loadChildren: () => import('./pages/transaction-form/transaction-form.module').then(m => m.TransactionFormPageModule) },
  // tslint:disable-next-line: max-line-length
  { path: 'worker-main', loadChildren: () => import('./pages/worker-tabs/worker-tabs.module').then(m => m.WorkerTabsPageModule), canActivate: [RoleGuard], data: { expectedRole: 1} },
  { path: 'transaction-details/:id', loadChildren: () => import('./pages/transaction-details/transaction-details.module').then(m => m.TransactionDetailsPageModule) },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
