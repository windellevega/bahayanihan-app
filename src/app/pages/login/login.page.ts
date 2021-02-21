import { UserService } from 'src/app/services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../services/auth/user-auth.service';
import {Router} from '@angular/router';
import { LoadingController, ToastController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  usernameOrEmail: string;
  password: string;

  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private userService: UserService) { }

  ionViewWillEnter() {
    if (!this.userAuthService.isTokenExpired()) {
      this.getInitialMainPage(localStorage.getItem('is_worker'));
    } else {
      this.userAuthService.logout();
    }
  }

  async login() {
    await this.showLoggingInLoading();

    await this.userAuthService.login(this.usernameOrEmail, this.password).subscribe(status => {
      if (status) {
        this.userService.getUserRole().subscribe(user => {
          localStorage.removeItem('is_worker');
          localStorage.setItem('is_worker', user.is_worker);
          this.getInitialMainPage(user.is_worker);
        });
      } else {
        this.showToast('Incorrect login credentials');
      }
      this.usernameOrEmail = '';
      this.password = '';
      this.hideLoggingInLoading();
      //alert(status);
    });
  }

  getInitialMainPage(isWorker) {
    if (Number(isWorker) === 0) {
      this.router.navigate(['/main/tabs']);
    } else {
      this.router.navigate(['/worker-main/tabs']);
    }
  }

  async showLoggingInLoading() {
    const loading = await this.loadingController.create({
      message: 'Logging in...',
      spinner: 'lines'
    });

    await loading.present();
  }

  async hideLoggingInLoading() {
    const loading = await this.loadingController.getTop();
    loading.dismiss();
  }

  async showToast(message) {
    const toast = await this.toastController.create({
      color: 'danger',
      duration: 2000,
      message,
    });

    await toast.present();
  }
}
