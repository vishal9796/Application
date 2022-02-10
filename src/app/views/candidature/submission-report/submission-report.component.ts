import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CandidatureService } from '../candidature.service';
import * as XLSX from 'xlsx';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SharedService } from '../../../common/-shared.service';

@Component({
  selector: 'app-submission-report',
  templateUrl: './submission-report.component.html',
  styleUrls: ['./submission-report.component.scss']
})
export class SubmissionReportComponent implements OnInit {

  @ViewChild('table') table: ElementRef;

  submissiondata = [];

  consultantList=[];
  studentlist=[];
  datelist=[];

  selectedConsultant:string="0";
  selectedStudent:string="0";
  SelectedDate:string="0";

  constructor(private candidatureservice: CandidatureService,private ngxLoader: NgxUiLoaderService,private sharedService :SharedService) { }

  ngOnInit(): void {
    this.getReportData().then(()=>{
      this.consultantList = this.submissiondata.filter(
        (thing, i, arr) => arr.findIndex(t => t.Name === thing.Name) === i
      );    
     // console.log(this.consultantList)   
      this.studentlist = this.submissiondata.filter(
        (thing, i, arr) => arr.findIndex(t => t.StudentName === thing.StudentName) === i
      );    
    //  console.log(this.studentlist)  
      this.datelist = this.submissiondata.filter(
        (thing, i, arr) => arr.findIndex(t => t.Sc_Date === thing.Sc_Date) === i
      );  
        
     // console.log(this.datelist)  

    });
  }
  getReportData() {
    let ConsultantId=0;
    var currentUser = this.sharedService.getCurrentUser();
    if( currentUser.Role== 2 || currentUser.Role == 3 || currentUser.Role == 4){
      ConsultantId = currentUser.Id;
    }
    var promise = new Promise((resolve, reject) => {
    this.candidatureservice.getSubmissionReport(ConsultantId).subscribe(
      (res) => {
        if (res) {
          // this.alert.success("Successfuly Saved");
          this.submissiondata = res;
          resolve(1);
          //console.log(this.submissiondata);
        }
      },
      error => { console.log(error) }
    )
  });
  return promise;
  }

  fireEvent() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Submission');

    
    XLSX.writeFile(wb, 'SubmissionReport.xlsx');

  }
  doSearch(){
    this.ngxLoader.start();
    this.getReportData().then(()=>{
    if(this.selectedConsultant !="0"){
      this.submissiondata = this.submissiondata.filter(x=> x.Name == this.selectedConsultant );
    }
    if(this.selectedStudent !="0"){
      this.submissiondata = this.submissiondata.filter(x=> x.StudentName == this.selectedStudent );
    }
    if(this.SelectedDate !="0"){
      this.submissiondata = this.submissiondata.filter(x=> x.Sc_Date == this.SelectedDate );
    } 
      
    this.ngxLoader.stop();
    });
  }
  doReset(){
    this.ngxLoader.start();
    this.selectedConsultant="0";
  this.selectedStudent="0";
  this.SelectedDate="0";

    this.getReportData().then(()=>this.ngxLoader.stop());
  }

}
