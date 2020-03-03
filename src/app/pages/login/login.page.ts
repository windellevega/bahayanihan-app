import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../services/auth/user-auth.service';
import {Router} from '@angular/router';
import { LoadingController } from '@ionic/angular';
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
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.checkGPSPermission();
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
      message: 'Logging in...',
      spinner: 'lines'
    });

    await loading.present();
  }

  async hideLogginInLoading() {
    const loading = await this.loadingController.getTop();
    loading.dismiss();
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
