import { RoleGuard } from './services/auth/role.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/auth/token.interceptor';

const routes: Routes = [
  { path: 'main', loadChildren: './pages/tabs/tabs.module#TabsPageModule', canActivate: [RoleGuard], data: { expectedRole: 0} },
  { path: '', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'messaging', loadChildren: './pages/messaging/messaging.module#MessagingPageModule' },
  { path: 'message-logs', loadChildren: './pages/message-logs/message-logs.module#MessageLogsPageModule' },
  { path: 'transaction-form', loadChildren: './pages/transaction-form/transaction-form.module#TransactionFormPageModule' },
  // tslint:disable-next-line: max-line-length
  { path: 'worker-main', loadChildren: './pages/worker-tabs/worker-tabs.module#WorkerTabsPageModule', canActivate: [RoleGuard], data: { expectedRole: 1} },
  { path: 'transaction-details/:id', loadChildren: './pages/transaction-details/transaction-details.module#TransactionDetailsPageModule' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
