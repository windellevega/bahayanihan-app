import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IUser } from 'src/app/interfaces/user.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.page.html',
  styleUrls: ['./transaction-form.page.scss'],
})
export class TransactionFormPage implements OnInit {
  workerInfo: IUser;
  transactionForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public activatedRoute: ActivatedRoute) {
      this.transactionForm = this.formBuilder.group({
        job_description: ['', Validators.required],
        transaction_cost: ['', Validators.required]
      });
    }

  ngOnInit() {
    this.workerInfo = history.state.data;
  }
}
