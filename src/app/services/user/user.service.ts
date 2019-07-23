import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IUser } from 'src/app/interfaces/user.interface';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService{

  constructor(private httpClient: HttpClient) { }

  getOwnProfile() {
    return this.httpClient.get<IUser>(environment.apiUrl + 'api/profile')
      .pipe();
  }

  updateUserLocation(latitude, longitude) {
    return this.httpClient.put<any>(environment.apiUrl + 'api/user-location',
    {
      current_lat: latitude,
      current_long: longitude
    }).pipe();
  }

  formatMobileNumber(mobileNo) {
    return [mobileNo.slice(0, 4), ' ' , mobileNo.slice(4, 7), ' ', mobileNo.slice(7, 11)].join('');
  }

  registerUser(firstName, middleName, lastName, emailAdd, username, password, mobileNo, address): Observable<any> {
    return this.httpClient.post<any>(environment.apiUrl + 'api/user/register',
      {
        firstname: firstName,
        middlename: middleName,
        lastname: lastName,
        email_address: emailAdd,
        username: username,
        password: password,
        address: address,
        current_lat: '0.0',
        current_long: '0.0',
        mobile_number: mobileNo

      }).pipe();
  }

  getWorkers(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(environment.apiUrl + 'api/users/1')
      .pipe()
  }

  getUserInformation(id): Observable<IUser> {
    return this.httpClient.get<IUser>(environment.apiUrl + 'api/user/' + id)
      .pipe();
  }
}
