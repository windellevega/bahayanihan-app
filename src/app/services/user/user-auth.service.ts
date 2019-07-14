import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap, catchError, mapTo } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClient: HttpClient) { }

  login(usernameOrEmail: string, password: string) {
    return this.httpClient.post<any>(environment.apiUrl + 'oauth/token',
      {
        grant_type: 'password',
        client_id: environment.oauth.clientId,
        client_secret: environment.oauth.clientSecret,
        username: usernameOrEmail,
        password: password
      }).pipe(
        tap(res => {
          localStorage.setItem('access_token', res.access_token);
          localStorage.setItem('refresh_token', res.refresh_token);
          console.log(localStorage.getItem('access_token'));
        }),
        catchError(error => {
          console.log(error);
          return of(false);
        })
      );
  }
}
