import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
