import { Component, OnInit, Input, NgZone } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IUser } from 'src/app/interfaces/user.interface';

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
    private modalController: ModalController) { 

    }

  ngOnInit() {
    
  }

  async dismissModal() {
    const modal = await this.modalController.getTop();
    await modal.dismiss();
  }
}
