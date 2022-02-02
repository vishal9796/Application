import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisteruserService {

  constructor(private http: HttpClient) { 


  }
  register(data): Observable<any>{
    // const newHttpClient = new HttpClient(this.httpBackend);
    // return newHttpClient.get<any>(this.APIPath+'api/login/gettoken',data); 
    return this.http.post<any>(environment.apiEndpoint+'api/login/insertEmployee',data);     
        
  }
}
