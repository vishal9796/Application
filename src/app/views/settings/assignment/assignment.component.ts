import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../common/-shared.service';

import { StudentAgainstConsult } from '../../../Models/ConsultantStudents';
import { registeruser } from '../../../Models/registeruser';
import { AlertService } from '../../_alert';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styles: [`.form-check-input {
    margin-left :1em !important;
}`
  ]
})
export class AssignmentComponent implements OnInit {

  studentlist: registeruser[] = [];
  consultantlist: registeruser[] = [];
  selectedConsultant: number = 0;

  selectedStudent


  constructor(private _service: SettingsService, private sharedservice: SharedService
    , private alert: AlertService

  ) { }

  ngOnInit(): void {
    this.getAll();
    this.getStudents();
  }
  getAll() {
    this.consultantlist = [];
    this._service.getConsultants()
      .subscribe(
        (res) => {
          if (res) {
            this.consultantlist = res;
          }
        },
        error => {
          console.log(error)
        }
      );

  }
  getStudents() {
    this.studentlist = [];
    this._service.getStudents()
      .subscribe(
        (res) => {
          if (res) {
            res.forEach((v, i, list) => {
              if (v.ConsultantId > 0) {
                res[i].selected = true;
                if (v.ConsultantId == this.selectedConsultant){                  
                  res[i].disabled = false;
                }
                else{
                  res[i].disabled = true;
                }
          }
          else{
            res[i].disabled = false;
          }

        });
    this.studentlist = res;


  }
},
error => {
  console.log(error)
} 
    ); 
  }
submitData(){
  let objCon = new Array<StudentAgainstConsult>();
  let _value = this.selectedConsultant;

  this.studentlist.filter(a => a.selected == true && a.disabled == false).forEach(function (item) {
    objCon.push(<StudentAgainstConsult>{ Stu_id: item.Id, Consultant_id: _value, CreatedDate: '' })
  });

  if (_value <= 0) {
    this.alert.error("Please select consultant");
    return;
  }
  if (objCon.length == 0) {
    //this.alert.error("Please select student");
    //return;
    objCon.push(<StudentAgainstConsult>{ Stu_id: 0, Consultant_id: _value, CreatedDate: '' })
  }


  this._service.updateStudents(objCon).subscribe(
    (res) => {
      if (res) {
        if (res.Status == 'Success') {
          this.alert.success("Successfuly Saved");
          this.selectedConsultant = 0;
          this.getStudents();
        }
        else {
          this.alert.error(res.Message);

        }
      }
    },
    error => { console.log(error) }
  )
}
refreshList(){
  //console.log("loadedlist",this.selectedConsultant)
  this.getStudents();
}
reset(){
  this.selectedConsultant = 0;
  this.getStudents();
}
}
