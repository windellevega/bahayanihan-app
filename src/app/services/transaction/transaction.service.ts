import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private httpClient: HttpClient) { }

  getTransactions(): Observable<any> {
    return this.httpClient.get<any>(environment.apiUrl + '/api/transactions')
      .pipe();
  }

  createTransaction(workerId, skillId, jobDescription, longitude, latitude, totalCost): Observable<any> {
    return this.httpClient.post<any>(environment.apiUrl + '/api/transaction',
      {
        worker_id: workerId,
        skill_id: skillId,
        job_description: jobDescription,
        transaction_long: longitude,
        transaction_lat: latitude,
        total_cost: totalCost
      }).pipe();
  }

  getTransaction(transactionId): Observable<any> {
    return this.httpClient.get<any>(environment.apiUrl + '/api/transaction/' + transactionId)
      .pipe();
  }
}
