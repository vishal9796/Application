import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidatureRoutingModule } from './candidature-routing.module';
import { CandidatureComponent } from './candidature.component';
import { CandidateInfoComponent } from './candidate-info/candidate-info.component';
import { StudentlistComponent } from './studentlist/studentlist.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { FormsModule } from '@angular/forms';
import { CommonModuleModule } from '../../common-module/common-module.module';
import { HealthCheckReportComponent } from './health-check-report/health-check-report.component';
import { SubmissionReportComponent } from './submission-report/submission-report.component';
import { ByweeklyReportComponent } from './byweekly-report/byweekly-report.component';
import { CombinedReportComponent } from './combined-report/combined-report.component';




@NgModule({
  declarations: [
    CandidatureComponent,
    CandidateInfoComponent,
    StudentlistComponent,
    HealthCheckReportComponent,
    SubmissionReportComponent,
    ByweeklyReportComponent,
    CombinedReportComponent
  ],
  imports: [
    CommonModule,
    CandidatureRoutingModule,
    CollapseModule,CdkAccordionModule,
    FormsModule,CommonModuleModule,
    
  ]
})
export class CandidatureModule { }
