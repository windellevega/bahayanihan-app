import { UserService } from 'src/app/services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../services/auth/user-auth.service';
import {Router} from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

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
    public geo: Geolocation,
    private androidPermissions: AndroidPermissions,
    private locationAccuracy: LocationAccuracy,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private userService: UserService) { }

  ngOnInit() {
    // this.checkGPSPermission();
  }

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

  checkGPSPermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => {
        if (result.hasPermission) {
          // If having permission show 'Turn On GPS' dialogue
          this.askToTurnOnGPS();
        } else {
          // If not having permission ask for permission
          this.requestGPSPermission();
        }
      },
      err => {
        alert('Check permission error ' + err);
        this.ngOnInit();
      }
    );
  }

  requestGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        console.log('4');
      } else {
        // Show 'GPS Permission Request' dialogue
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(
            () => {
              // call method to turn on GPS
              this.askToTurnOnGPS();
            },
            error => {
              // Show alert if user click on 'No Thanks'
              alert('requestPermission Error requesting location permissions ' + error);
              this.ngOnInit();
            }
          );
      }
    });
  }

  askToTurnOnGPS() {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {
        // When GPS Turned ON call method to get Accurate location coordinates
        this.ngOnInit();
      },
      error => {
        alert('Error requesting location permissions ' + JSON.stringify(error));
        this.ngOnInit();
      }
    );
  }
}
