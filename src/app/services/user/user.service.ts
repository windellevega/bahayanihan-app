import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IUser } from 'src/app/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService{

  constructor(private httpClient: HttpClient) { }

  getOwnProfile() {
    return this.httpClient.get<IUser>(environment.apiUrl + 'api/profile')
      .pipe();
  }

  formatMobileNumber(mobileNo) {
    return [mobileNo.slice(0, 4), ' ' , mobileNo.slice(4, 7), ' ', mobileNo.slice(7, 11)].join('');
  }
}
