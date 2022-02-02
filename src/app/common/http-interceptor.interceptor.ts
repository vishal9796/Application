import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {
  private AUTH_HEADER = "Authorization";
  //private token = "secrettoken";
  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
 
  constructor(private cookieService:CookieService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {   
    //console.log("HttpInterceptor",request);
    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        headers: request.headers.set('Content-Type', 'application/json')
      });
    }
    request = this.addAuthenticationToken(request);
    
    
    return next.handle(request);
  }
  addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
    let token="jwttoken";
    token = this.cookieService.get('jwttoken');
    if (!token) {
      return request;
    }    
    if (!request.url.match(environment.apiEndpoint)) {
        return request;
    }
    return request.clone({
      headers: request.headers.set(this.AUTH_HEADER, "Bearer " + token)
    });
  }
}
