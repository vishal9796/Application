import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  APIPath = environment.apiEndpoint;
  constructor(private http: HttpClient) { }

  getAllRegistrations(): Observable<any> {
    return this.http.get<any>(this.APIPath + 'api/EmployeeDetails/GerAllRecord');
  }
  getCategory(): Observable<any> {
    return this.http.get<any>(this.APIPath + 'api/EmployeeDetails/GerAllCategory');
  }
  getStudents(): Observable<any> {
    return this.http.get<any>(this.APIPath + 'api/EmployeeDetails/GerAllStudent');
  }
  getConsultants(): Observable<any> {
    return this.http.get<any>(this.APIPath + 'api/EmployeeDetails/GerAllConsultant');
  }
  updateStudents(data):Observable<any>{
    //api/EmployeeDetails/UpdateRecord
    return this.http.post<any>(this.APIPath + 'api/EmployeeDetails/InsertStudentAgainstConcult',data);
  }
  //api/Report/InsertSupervisorAgainstConcult
  updateCategory(data):Observable<any>{
    //api/EmployeeDetails/UpdateRecord
    return this.http.put<any>(this.APIPath + 'api/EmployeeDetails/UpdateRecord',data);
  }
  getAssignedRegistrations():Observable<any>{
    return this.http.get<any>(this.APIPath+'api/EmployeeDetails/GerAssignedStudent');
  }
  getSupervisor(): Observable<any> {
    return this.http.get<any>(this.APIPath + 'api/Report/SupervisorList');
  }
  getConsulants(): Observable<any> {
    return this.http.get<any>(this.APIPath + 'api/Report/ConsultanatForSuervisorList');
  }
  assignConsultantToSupervisor(data):Observable<any>{
    //api/EmployeeDetails/UpdateRecord
    return this.http.post<any>(this.APIPath + 'api/Report/InsertSupervisorAgainstConcult',data);
  }
  
}
