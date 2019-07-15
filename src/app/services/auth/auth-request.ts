import { Headers, Http, BaseRequestOptions } from '@angular/http';

const AUTH_HEADER_KEY = 'Authorization';
const AUTH_PREFIX = 'Bearer';

export class AuthRequestOptions extends BaseRequestOptions {

  constructor() {
    super();

    const token = localStorage.getItem('access_token');
    if (token) {
      this.headers.append(AUTH_HEADER_KEY, `${AUTH_PREFIX} ${token}`);
    }
  }
}
