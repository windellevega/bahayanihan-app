import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/auth/token.interceptor';

const routes: Routes = [
  { path: 'main', loadChildren: './components/tabs/tabs.module#TabsPageModule', canActivate: [AuthGuard] },
  { path: '', loadChildren: './components/login/login.module#LoginPageModule' },
  { path: 'login', loadChildren: './components/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },

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
