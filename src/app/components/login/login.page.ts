import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../services/auth/user-auth.service';
import {Router} from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usernameOrEmail: string;
  password: string;

  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    private loadingController: LoadingController) { }

  ngOnInit() {
  }

  async login() {
    await this.showLoggingInLoading();

    await this.userAuthService.login(this.usernameOrEmail, this.password).subscribe(status => {
      if (status) {
        this.router.navigate(['/main/tabs']);
      } else {
        alert('Incorrect login credentials.');
      }
      this.usernameOrEmail = '';
      this.password = '';
      this.hideLogginInLoading();
    });
  }

  async showLoggingInLoading() {
    const loading = await this.loadingController.create({
      message: 'Logging in...'
    });

    await loading.present();
  }

  async hideLogginInLoading() {
    const loading = await this.loadingController.getTop();
    loading.dismiss();
  }
}
