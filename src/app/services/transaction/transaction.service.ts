import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { UserAuthService } from '../auth/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  echo: any;
  transaction$ = new BehaviorSubject<any>('');

  constructor(
    private httpClient: HttpClient,
    private userAuthService: UserAuthService) {
    const pusher = Pusher;
    this.echo = new Echo({
      broadcaster: 'pusher',
      key: '5d48753513e0ef60a4d1',
      cluster: 'ap1',
      authEndpoint: environment.apiUrl + '/broadcasting/auth',
      encrypted: true
    });
  }

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

  updateTransactionStatus(transactionId, statusId): Observable<any> {
    return this.httpClient.put<any>(environment.apiUrl + '/api/transaction/status/' + transactionId,
    {
      status: statusId
    })
    .pipe();
  }

  listenNewTransactionChannel(id): Observable<any> {
    this.echo.connector.pusher.config.auth.headers.Authorization = 'Bearer ' + this.userAuthService.getToken();
    console.log('Listening to transactions.' + id + ' channel...');
    this.echo.private('transactions.' + id)
      .listen('NewTransaction', (transaction) => {
        this.transaction$.next(transaction);
      });
    console.log(this.echo);
    return this.transaction$.asObservable();
  }

  leaveNewTransactionChannel(id) {
    this.echo.leave('transactions.' + id);
  }
}
