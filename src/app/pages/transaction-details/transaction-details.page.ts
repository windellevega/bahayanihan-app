import { TransactionService } from 'src/app/services/transaction/transaction.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.page.html',
  styleUrls: ['./transaction-details.page.scss'],
})
export class TransactionDetailsPage implements OnInit {
  transactionId: any;
  transactionDetails: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private transactionService: TransactionService) { }

  ngOnInit() {
    this.transactionId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getTransactionDetails(this.transactionId);
  }

  getTransactionDetails(transactionId) {
    this.transactionService.getTransaction(transactionId)
    .subscribe(data => {
      this.transactionDetails = data;
      console.log(this.transactionDetails);
    });
  }
}
