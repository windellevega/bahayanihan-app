import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.page.html',
  styleUrls: ['./transaction-form.page.scss'],
})
export class TransactionFormPage implements OnInit {
  transactionForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder) { 
      this.transactionForm = this.formBuilder.group({
        job_description: ['', Validators.required],
        transaction_cost: ['', Validators.required]
      });
    }

  ngOnInit() {
  }

}
