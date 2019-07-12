import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-workerinfo-modal',
  templateUrl: './workerinfo-modal.page.html',
  styleUrls: ['./workerinfo-modal.page.scss'],
})
export class WorkerinfoModalPage implements OnInit {

  rate: any = 5
  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  async dismissModal() {
    const modal = await this.modalController.getTop();
    await modal.dismiss();
  }
}
