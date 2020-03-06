import { Component, OnInit, Input, NgZone } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IUser } from 'src/app/interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workerinfo-modal',
  templateUrl: './workerinfo-modal.page.html',
  styleUrls: ['./workerinfo-modal.page.scss'],
})
export class WorkerinfoModalPage implements OnInit {

  @Input() workerInfo: IUser;

  userInfo: IUser;
  rate: any = 5;

  constructor(
    private modalController: ModalController,
    private router: Router) {

    }

  ngOnInit() {

  }

  async dismissModal() {
    const modal = await this.modalController.getTop();
    await modal.dismiss();
  }

  onRateChange($event) {

  }

  navigateToTransactionForm() {
    this.router.navigate(['/transaction-form'], {
      state: {
        data: this.workerInfo
      }
    });
    this.dismissModal();
  }
}
