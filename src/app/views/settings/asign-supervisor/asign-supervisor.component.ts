import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../common/-shared.service';

import { ConsultantAgainstSupervisor } from '../../../Models/ConsultantAgainstSupervisor';
import { registeruser } from '../../../Models/registeruser';
import { AlertService } from '../../_alert';
import { SettingsService } from '../settings.service';


@Component({
  selector: 'app-asign-supervisor',
  templateUrl: './asign-supervisor.component.html',
  styleUrls: ['./asign-supervisor.component.scss']
})
export class AsignSupervisorComponent implements OnInit {

  
  consultantlist=[];// registeruser[] = [];
  supervisorlist: registeruser[] = [];
  selectedsup: number = 0;

  selectedconsult


  constructor(private _service: SettingsService, private sharedservice: SharedService
    , private alert: AlertService

  ) { }

  ngOnInit(): void {
    this.getAll();
    this.getStudents();
  }
  getAll() {
    this.supervisorlist = [];
    this._service.getSupervisor()
      .subscribe(
        (res) => {
          if (res) {
            this.supervisorlist = res;
          }
        },
        error => {
          console.log(error)
        }
      );

  }
  getStudents() {
    this.consultantlist = [];
    this._service.getConsulants()
      .subscribe(
        (res) => {
          if (res) {
         
            res.forEach((v, i, list) => {
              if (v.SupervisorID > 0) {
                res[i].selected = true;
                if (v.SupervisorID == this.selectedsup){                  
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
    this.consultantlist = res;
debugger

  }
},
error => {
  console.log(error)
} 
    ); 
  }
submitData(){
  debugger;
  let objCon = new Array<ConsultantAgainstSupervisor>();
  let _value = this.selectedsup;

  this.consultantlist.filter(a => a.selected == true && a.disabled == false).forEach(function (item) {
    objCon.push(<ConsultantAgainstSupervisor>{ Supervisor_id: _value, Consultant_id: item.ConsultantId, CreatedDate: '' })
  });

  if (_value <= 0) {
    this.alert.error("Please select supervisor");
    return;
  }
  if (objCon.length == 0) {    
    objCon.push(<ConsultantAgainstSupervisor>{ Supervisor_id: _value, Consultant_id: 0, CreatedDate: '' })
  }


  this._service.assignConsultantToSupervisor(objCon).subscribe(
    (res) => {
      if (res) {
        if (res.Status == 'Success') {
          this.alert.success("Successfuly Saved");
          this.selectedsup = 0;
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
  this.selectedsup = 0;
  this.getStudents();
}
}
