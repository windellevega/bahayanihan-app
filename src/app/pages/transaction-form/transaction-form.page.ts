import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IUser } from 'src/app/interfaces/user.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { TransactionService } from 'src/app/services/transaction/transaction.service';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.page.html',
  styleUrls: ['./transaction-form.page.scss'],
})
export class TransactionFormPage implements OnInit {
  workerInfo: IUser;
  transactionForm: FormGroup;
  latitude: any;
  longitude: any;
  skillNeeded = '0';

  constructor(
    private formBuilder: FormBuilder,
    public activatedRoute: ActivatedRoute,
    private geo: Geolocation,
    private transactionService: TransactionService,
    private router: Router,
    private toastController: ToastController,
    private loadingController: LoadingController) {
      this.transactionForm = this.formBuilder.group({
        job_description: ['', Validators.required],
        transaction_cost: ['', Validators.required],
        job_type: ['', Validators.required],
      });
    }

  ngOnInit() {
    this.workerInfo = history.state.workerInfo;

    if (history.state.skillNeeded !== 0) {
      this.skillNeeded = String(history.state.skillNeeded);
      this.getSkillCost();
    }

    this.geo.getCurrentPosition().then(pos => {
      this.latitude = pos.coords.latitude;
      this.longitude = pos.coords.longitude;
    })
    .catch(err => {
      alert('Your location is not enabled');
    });
  }

  getSkillCost() {
    this.workerInfo.skills.forEach(skill => {
      if (skill.id === Number(this.transactionForm.value.job_type)) {
        this.transactionForm.controls.transaction_cost.setValue(skill.skill_rate);
      }
    });
  }

  async createTransaction() {
    this.showCreatingTransactionLoading();

    this.transactionService.createTransaction(
      this.workerInfo.id,
      this.transactionForm.value.job_type,
      this.transactionForm.value.job_description,
      this.longitude,
      this.latitude,
      this.transactionForm.value.transaction_cost)
      .subscribe(async res => {
        this.hideCreatingTransactionLoading();

        this.showToast(res.message);

        this.router.navigate(['/main/tabs/transactions-tab']);
      });
  }

  async showCreatingTransactionLoading() {
    const loading = await this.loadingController.create({
      message: 'Creating transaction...',
      spinner: 'lines'
    });

    await loading.present();
  }

  async hideCreatingTransactionLoading() {
    const loading = await this.loadingController.getTop();
    loading.dismiss();
  }

  async showToast(message) {
    const toast = await this.toastController.create({
      color: 'primary',
      duration: 2000,
      message
    });

    await toast.present();
  }
}
