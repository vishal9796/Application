import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpBackend, HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService { 
  APIPath = environment.apiEndpoint;
  constructor(private http: HttpClient,private httpBackend: HttpBackend) {      // httpBackend to bypass interceptor
  } 
  doApiCall(): Observable<any>{
    return this.http.get<any>(this.APIPath+'api/Login/GetToken');              
  }
  login(user:string,pass:string): Observable<any>{
    const newHttpClient = new HttpClient(this.httpBackend);
    return newHttpClient.get<any>(this.APIPath+'api/Login/GetToken?Username='+user+'&Password='+pass); 
    //return this.http.get<any>(this.APIPath+'api/login/gettoken',data);     
        
  }
}
