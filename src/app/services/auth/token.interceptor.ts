import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { UserAuthService } from '../auth/user-auth.service';
import { Observable } from 'rxjs';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public userAuthService: UserAuthService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.userAuthService.getToken()}`
      }
    });
    return next.handle(request);
  }
}
