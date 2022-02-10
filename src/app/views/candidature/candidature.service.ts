import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CandidatureService {
  APIPath = environment.apiEndpoint;
  constructor(private http: HttpClient) { }

  getStudentsAgainstConsultant(Consultant_id): Observable<any> {
    return this.http.get<any>(this.APIPath + 'api/Report/StudentAgainstConsultant?ConsultId='+Consultant_id);
  }
  getHealthData(studid): Observable<any> {
    return this.http.get<any>(this.APIPath + 'api/Report/CareerMaster?StudentID='+studid);
  }
  getSubmissionData(studid): Observable<any> {
    return this.http.get<any>(this.APIPath + 'api/Report/ClientMaster?StudentID='+studid);
  }
  getByWeeklyData(studid): Observable<any> {
    return this.http.get<any>(this.APIPath + 'api/Report/GetByweekly?studId='+studid);
  }
  saveData(HealthSubmsn){
    return this.http.post<any>(this.APIPath + 'api/Report/InsertHealthSubmission',HealthSubmsn);
  }
  saveWeekly(data){
    return this.http.post<any>(this.APIPath + 'api/Report/InsertByWeekly',data);
  }
  getCareerData(){
    return this.http.get<any>(this.APIPath + 'api/Report/GerAllCareerSite');
  }
  getClientCount(){
    return this.http.get<any>(this.APIPath + 'api/Report/GerClientCount');
  }
  SaveCareerData(sitemaster){
    return this.http.post<any>(this.APIPath + 'api/Report/InsertCareerMaster',sitemaster);
  }
  SaveClientData(clientmaster){
    return this.http.post<any>(this.APIPath + 'api/Report/InsertClientMaster',clientmaster);
  }
  DeleteCareerData(id){
    return this.http.delete<any>(this.APIPath + 'api/Report/DeleteCareerMaster?id='+id);
  }
  DeleteClientData(id){
    return this.http.delete<any>(this.APIPath + 'api/Report/DeleteClientsMaster?id='+id);
  }
  getHealthCheckReport(ConsultantID){
    return this.http.get<any>(this.APIPath + 'api/Report/HealthCheckeport?ConsultantID='+ConsultantID);
  }
  getSubmissionReport(ConsultantID){
    return this.http.get<any>(this.APIPath + 'api/Report/SubmissionReport?ConsultantID='+ConsultantID);
  }
  getByWeeklyReport(ConsultantID){
    return this.http.get<any>(this.APIPath + 'api/Report/ByweeklyReport?ConsultantID='+ConsultantID);
  }
  getHealthDataByDate(FilterDate,studid): Observable<any> {
    return this.http.get<any>(this.APIPath + 'api/Report/HealthCheckeportByDate?FilterDate='+FilterDate+'&StuId='+studid);
  }
  getSubmissionDataByDate(FilterDate,studid): Observable<any> {
    return this.http.get<any>(this.APIPath + 'api/Report/SubmissionReportByDate?FilterDate='+FilterDate+'&StuId='+studid);
  }
  getWeeklyDataByDate(FilterDate,studid): Observable<any> {
    return this.http.get<any>(this.APIPath + 'api/Report/GetByWeeklyReportbyDate?FilterDate='+FilterDate+'&StuId='+studid);
  }
}
