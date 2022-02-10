import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsignSupervisorComponent } from './asign-supervisor/asign-supervisor.component';
import { AssignmentComponent } from './assignment/assignment.component';
import { RegistrationsComponent } from './registrations/registrations.component';
import { SettingsComponent } from './settings.component';

const routes: Routes =
  [
    {
      path: '',
      data: {
        title: 'Settings'
      },
      children: [
        {
          path: 'registrations',
          component: RegistrationsComponent,
          data: {
            title: 'Registrations'
          }

        },
        {
          path: 'assignment',
          component: AssignmentComponent,
          data: {
            title: 'Assign Students'
          }

        },
        {
          path: 'asignsup',
          component: AsignSupervisorComponent,
          data: {
            title: 'Assign Supervisor'
          }

        },
      ]
    // { path: '', component: SettingsComponent },
    // { path: 'registrations', component: RegistrationsComponent }
      }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
