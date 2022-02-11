import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SharedService } from '../../../common/-shared.service';
import { Byweekly } from '../../../Models/ByWeekly';
import { CareerSiteMaster } from '../../../Models/CareerSiteMaster';
import { ClientCountMaster } from '../../../Models/ClientCountMaster';
import { HealthCheckDaily } from '../../../Models/HealthCheckDaily';
import { MarketingDailyEntry } from '../../../Models/MarketingDailyEntry';
import { SubmissionDaily } from '../../../Models/SubmissionDaily';
import { AlertService } from '../../_alert';
import { CandidatureService } from '../candidature.service';

@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.component.html',
  styles: [
    `
    .blink_me {
      font-weight: bold;
      color: green;
      animation: blinker 1s linear infinite;
    }
    
    @keyframes blinker {  
      50% { opacity: 0; }
    }
    `
  ]

})
export class StudentlistComponent implements OnInit {
  showStudent = false;

  items = [];//['Vishnu Serghei', 'Zbyněk Phoibos', 'Einar Randall', 'Félix Troels	', 'Aulus Agmundr	'];
  sites = [];//['Career Builder','Zip Recruiter','Monster','Indeed'];
  client = [];//['C1','C2','C3','C4','C5']


  expandedIndex = 0;

  isTraining = false;
  isMarketing = true;
  isSupport = false;
  showGrid = false;

  Hc_Date = new Date();
  LatestResume = new Date();;
  Sc_Date = new Date();
  ByWeeklyDate = new Date();

  todaysDate=new Date();

  IsLatestHealthData: boolean = false;
  IsLatestSubData: boolean = false;
  IsLatestWeeklyDate = false;
  weeklyDataLoaded = false;

  CurrentStudent;

  sitemaster: CareerSiteMaster;
  sitemasterlist: Array<CareerSiteMaster> = [];

  clientmaster: ClientCountMaster;
  clinetmasterlist: Array<ClientCountMaster> = [];

  byweekly: Byweekly;

  isSupervisor = false;


  healthDataNotFound: boolean = false;
  submissionDataNotFound: boolean = false;
  weeklyDataNotFound: boolean = false;


  constructor(private router: Router, private sharedservice: SharedService,
    private candidatureservice: CandidatureService,
    private ngxLoader: NgxUiLoaderService,
    private datePipe: DatePipe,
    private alert: AlertService) {

    this.sitemaster = new CareerSiteMaster();
    this.clientmaster = new ClientCountMaster();
    this.byweekly = new Byweekly();
  }

  ngOnInit(): void {
    this.getStudents();
    this.getSiteMaster();
    this.getClinetMaster();
    this.isSupervisor = true; //this.sharedservice.getCurrentUser().Role == 2 ? true : false;

  }


  gotoPage() {
    // this.router.navigate['/studentview']
    this.showStudent = true;
  }
  backPressed() {
    this.showStudent = false;
  }
  toggleButton(number) {
    // this.isTraining=true;
    // this.isMarketing=true;
    // this.isSupport=true;
    // if(number==2){
    //   this.isMarketing=false;
    // }
    this.showGrid = true;

  }
  getStudents() {
    let consultant = this.sharedservice.getCurrentUser().Id;
    this.candidatureservice.getStudentsAgainstConsultant(consultant).subscribe(
      (res) => {
        if (res) {
          if (res) {
            this.items = res;
          }
        }
      },
      error => { console.log(error) }
    )
  }
  getStudentData(studentID: number, isExpanded: boolean) {
debugger;
    if (isExpanded) {
      this.CurrentStudent = studentID;
      this.ngxLoader.start();
      this.candidatureservice.getHealthData(studentID).subscribe(
        (res) => {
          if (res) {
            if (res) {
              this.sites = res;
              console.log('HealthData-',this.sites);
              this.CurrentStudent = studentID;
              if (this.datePipe.transform(this.todaysDate, 'yyyy-MM-dd') == this.datePipe.transform(res[0].Hc_Date, 'yyyy-MM-dd')) {
                this.IsLatestHealthData = true;
              }
              else {
                this.Hc_Date = res[0].Hc_Date;
                
                this.IsLatestHealthData = false;
              }
              this.LatestResume = res[0].LatestResume;

            }
          }
        },
        error => { console.log(error) }
      )
      this.candidatureservice.getSubmissionData(studentID).subscribe(
        (res) => {
          if (res) {
            if (res) {
              this.client = res;
              console.log('SubmissionData-',this.client);
              this.CurrentStudent = studentID;
              if (this.datePipe.transform(this.todaysDate, 'yyyy-MM-dd') == this.datePipe.transform(res[0].Sc_Date, 'yyyy-MM-dd')) {
                this.IsLatestSubData = true;
              }
              else {
                this.Sc_Date = res[0].Sc_Date;
                this.IsLatestSubData = false;
              }
              this.ngxLoader.stop();
            }
          }
        },
        error => { console.log(error) }
      )

      this.candidatureservice.getByWeeklyData(studentID).subscribe(
        (res) => {
          if (res) {
            if (res.length > 0) {
              this.byweekly = res[0];
              console.log('byweeklyData-',this.byweekly);
              this.CurrentStudent = studentID;
              this.weeklyDataLoaded = true;
              if (this.datePipe.transform(this.todaysDate, 'yyyy-MM-dd') == this.datePipe.transform(res[0].Date, 'yyyy-MM-dd')) {
                this.IsLatestWeeklyDate = true;
              }
              else {
                this.ByWeeklyDate = res[0].Date;
                this.IsLatestWeeklyDate = false;
              }
              this.ngxLoader.stop();
            }
          }
        },
        error => { console.log(error) }
      )
    }
  }

  Submit() {
    debugger;
    //console.log("sites",this.sites);
    //console.log("client",this.client);
    let cnt = this.sites.filter(a=> a.Ispresent == null);
    if(cnt.length > 0){
      this.alert.error("Fill All Fields For Health Check-Up");
      this.ngxLoader.stop();
      return;
    }

    this.ngxLoader.start();

    let objHealth = new Array<HealthCheckDaily>();
    let objSumbmission = new Array<SubmissionDaily>();
    let _Hc_Date = this.datePipe.transform(this.Hc_Date, 'yyyy-MM-dd'); //this.Hc_Date;
    let _LatestResume = this.datePipe.transform(this.LatestResume, 'yyyy-MM-dd');// this.LatestResume;
    let _Sc_Date = this.datePipe.transform(this.Sc_Date, 'yyyy-MM-dd') //this.Sc_Date;
    let studId = this.CurrentStudent;
    let objEntry = new MarketingDailyEntry();

    this.sites.forEach(function (item) {
      
      objHealth.push(<HealthCheckDaily>{
        Hc_Date: _Hc_Date,
        StudentID: studId,
        CareerSiteID: item.CarreID,
        Ispresent: item.Ispresent,
        LatestResume: _LatestResume.toString(),
      })
    });

    this.client.forEach(function (item) {
      objSumbmission.push(<SubmissionDaily>{
        Sc_Date: _Sc_Date,
        StudentID: studId,
        ClientCountID: item.ClientId,
        ClientDetails: item.ClientDetails
      })
    });

    objEntry.Health = objHealth;
    objEntry.Submission = objSumbmission;

    //console.log("objEntry", objEntry);


    this.candidatureservice.saveData(objEntry).subscribe(
      (res) => {
        if (res.Status=="Success") {
          if (this.isSupervisor) {
            this.sumbitWeekly();
          }
          else {
            this.ngxLoader.stop();
            this.alert.success("Successfuly Saved");
          }
        }
        else{
          this.ngxLoader.stop();
          this.alert.error(res.Message);
        }
      },
      error => { console.log(error); this.ngxLoader.stop() }
    )



  }
  sumbitWeekly() {
    console.log("weekly", this.byweekly)
    let obj = new Byweekly();
    obj.Date = this.datePipe.transform(this.ByWeeklyDate, 'yyyy-MM-dd');
    obj.EASY_APPLICATION = this.byweekly.EASY_APPLICATION;
    obj.COMPANY_SITE_APPLICATION = this.byweekly.COMPANY_SITE_APPLICATION;
    obj.EMAIL_REACH_OUT = this.byweekly.EMAIL_REACH_OUT;
    obj.CALLS_REACH_OUT = this.byweekly.CALLS_REACH_OUT;
    obj.EMAIL_FLOW = this.byweekly.EMAIL_FLOW;
    obj.CALLS_RECEIVED = this.byweekly.CALLS_RECEIVED;
    obj.Stu_id = this.CurrentStudent;
    let conId= this.sharedservice.getCurrentUser().Id;
    obj.Consultant_id = conId;

    this.candidatureservice.saveWeekly(obj).subscribe(
      (res) => {
        if (res.Status == 'Success') {
          this.ngxLoader.stop();
          this.alert.success("Successfuly Saved");

        }
        else {
          this.alert.error(res.Message);
          this.ngxLoader.stop();
        }
      },
      error => { console.log(error); this.ngxLoader.stop(); }
    )
  }

  getSiteMaster() {
    this.candidatureservice.getCareerData().subscribe(
      (res) => {
        if (res) {
          if (res) {
            this.sitemasterlist = res;
          }
        }
      },
      error => { console.log(error) }
    )
  }
  getClinetMaster() {
    this.candidatureservice.getClientCount().subscribe(
      (res) => {
        if (res) {
          if (res) {
            this.clinetmasterlist = res;
          }
        }
      },
      error => { console.log(error) }
    )
  }

  SaveCareerSite() {
   // console.log(this.sitemaster);
    this.ngxLoader.start();
    this.candidatureservice.SaveCareerData(this.sitemaster).subscribe(
      (res) => {
        if (res) {
          //this.alert.success("Successfuly Saved");
          this.getSiteMaster();
          this.ngxLoader.stop();
        }
      },
      error => { console.log(error); this.ngxLoader.stop(); }
    )


  }
  SaveClientCount() {
    //console.log(this.clientmaster);
    this.ngxLoader.start();
    this.candidatureservice.SaveClientData(this.clientmaster).subscribe(
      (res) => {
        if (res) {
          // this.alert.success("Successfuly Saved");
          this.getClinetMaster();
          this.ngxLoader.stop();
        }
      },
      error => { console.log(error); this.ngxLoader.stop(); }
    )
  }
  deleteClientCount(id) {
   // console.log(this.sitemaster);
    this.ngxLoader.start();
    this.candidatureservice.DeleteClientData(id).subscribe(
      (res) => {
        if (res) {
          //this.alert.success("Successfuly Saved");
          this.getClinetMaster();
          this.ngxLoader.stop();
        }
      },
      error => {
        console.log(error);
        this.ngxLoader.stop();
      }
    )


  }
  deleteCareerSite(id) {
    //console.log(this.sitemaster);
    this.ngxLoader.start();
    this.candidatureservice.DeleteCareerData(id).subscribe(
      (res) => {
        if (res) {
          //this.alert.success("Successfuly Saved");
          this.getSiteMaster();
          this.ngxLoader.stop();
        }
      },
      error => {
        console.log(error);
        this.ngxLoader.stop();
      }
    )


  }
  healthDateChanged(e){
    
    this.Hc_Date = e;
    this.ngxLoader.start();
    let date = this.datePipe.transform(this.Hc_Date, 'MM/dd/yyyy');
    this.candidatureservice.getHealthDataByDate(date,this.CurrentStudent).subscribe(
      (res) => {
        if (res!= null && res.length>0) {          
            this.sites = res;
            console.log('HealthDataByDate-',this.sites);
            if (this.datePipe.transform(this.todaysDate, 'yyyy-MM-dd') == this.datePipe.transform(res[0].Hc_Date, 'yyyy-MM-dd')) {
              this.IsLatestHealthData = true;
            }
            else {
             // this.Hc_Date = res[0].Hc_Date;
              
              this.IsLatestHealthData = false;
            }
            this.LatestResume = res[0].LatestResume;   
            this.ngxLoader.stop();       
            this.healthDataNotFound=false;
        }
        else{
          this.sites.forEach((v,i)=>{
            v.Ispresent="";
           
          })
          this.LatestResume = null;
          this.ngxLoader.stop();
          this.healthDataNotFound=true;
        }
      },
      error => { console.log(error);this.ngxLoader.stop(); }
    )
  }
  submissionDateChanged(e){
    
    this.Sc_Date =e;
    this.ngxLoader.start();
    let date = this.datePipe.transform(this.Sc_Date, 'MM/dd/yyyy');
    this.candidatureservice.getSubmissionDataByDate(date,this.CurrentStudent).subscribe(
      (res) => {
        //this.ngxLoader.stop();
          if (res!= null && res.length>0) {
            this.client = res;
            console.log('SubmissionDataByDate-',this.client);             
            if (this.datePipe.transform(this.todaysDate, 'yyyy-MM-dd') == this.datePipe.transform(res[0].Sc_Date, 'yyyy-MM-dd')) {
              this.IsLatestSubData = true;
            }
            else {
              //this.Sc_Date = res[0].Sc_Date;
              this.IsLatestSubData = false;
            }
            this.ngxLoader.stop(); 
            this.submissionDataNotFound = false;
            
          }
          else{
            this.client.forEach((v,i)=>{
              v.ClientDetails="";
             
            })
            this.ngxLoader.stop();
            this.submissionDataNotFound=true;
          }
        
      },
      error => { console.log(error);this.ngxLoader.stop(); }
    )
  }
  WeeklyDateChanged(e){
    this.ByWeeklyDate=e;
    this.ngxLoader.start();
    let date = this.datePipe.transform(this.ByWeeklyDate, 'MM/dd/yyyy');
    this.candidatureservice.getWeeklyDataByDate(date,this.CurrentStudent).subscribe(
      (res) => {
       
          if (res!= null && res.length > 0) {
            this.byweekly = res[0];
            console.log('byweeklyDataByDate-',this.byweekly);
            
            this.weeklyDataLoaded = true;
            if (this.datePipe.transform(this.todaysDate, 'yyyy-MM-dd') == this.datePipe.transform(res[0].Date, 'yyyy-MM-dd')) {
              this.IsLatestWeeklyDate = true;
            }
            else {
              
              this.IsLatestWeeklyDate = false;
            }
            this.ngxLoader.stop();
            this.weeklyDataNotFound=false;
          }
          else{
            
            this.byweekly.EASY_APPLICATION="";
            this.byweekly.COMPANY_SITE_APPLICATION="";
            this.byweekly.EMAIL_REACH_OUT="";
            this.byweekly.CALLS_REACH_OUT="";
            this.byweekly.EMAIL_FLOW="";
            this.byweekly.CALLS_RECEIVED="";
            this.ngxLoader.stop();
            this.weeklyDataNotFound = true;
          }
        
      },
      error => { console.log(error) }
    )
  }
}
