import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

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
        }),
        catchError(error => {
          return of(false);
        })
      );
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  getToken(): string {
    return localStorage.getItem('access_token');
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) {
      token = this.getToken();
    }

    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }
    return !(date.valueOf() > new Date().valueOf());
  }
}
