import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountTabPage } from './account-tab.page';
import { UserAuthService } from 'src/app/services/auth/user-auth.service';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: AccountTabPage }])
  ],
  providers: [UserAuthService],
  declarations: [AccountTabPage]
})
export class AccountTabPageModule {}
