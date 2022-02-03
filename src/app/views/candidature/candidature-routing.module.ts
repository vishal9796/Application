import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ByweeklyReportComponent } from './byweekly-report/byweekly-report.component';
import { CandidateInfoComponent } from './candidate-info/candidate-info.component';
import { CandidatureComponent } from './candidature.component';
import { CombinedReportComponent } from './combined-report/combined-report.component';
import { HealthCheckReportComponent } from './health-check-report/health-check-report.component';
import { StudentlistComponent } from './studentlist/studentlist.component';
import { SubmissionReportComponent } from './submission-report/submission-report.component';

//const routes: Routes = [{ path: '', component: CandidatureComponent }];

const routes: Routes =
  [
    {
      path: '',
      data: {
        title: 'Users'
      },
      children: [
        {
          path: 'candidateInfo',
          component: StudentlistComponent,
          data: {
            title: 'Trainee'
          }

        },
        {
          path: 'studentview',
          component: CandidateInfoComponent,
          data: {
            title: 'Student Details'
          }

        },
        {
          path: 'healthcheckreport',
          component: HealthCheckReportComponent,
          data: {
            title: 'Health Check Report'
          }

        },
        {
          path: 'submissionreport',
          component: SubmissionReportComponent,
          data: {
            title: 'Submission Report'
          }

        },
        {
          path: 'byweeklyreport',
          component: ByweeklyReportComponent,
          data: {
            title: 'BiWeekly Report'
          }

        },
        {
          path: 'combinedreport',
          component: CombinedReportComponent,
          data: {
            title: 'Combined Report'
          }

        },
      ],
    // { path: '', component: SettingsComponent },
    // { path: 'registrations', component: RegistrationsComponent }
      }
      
  ];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidatureRoutingModule { }
