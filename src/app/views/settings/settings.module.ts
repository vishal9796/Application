import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { RegistrationsComponent } from './registrations/registrations.component';

// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AlertModule } from 'ngx-bootstrap/alert';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AssignmentComponent } from './assignment/assignment.component';
import {FormsModule} from "@angular/forms";
import { CommonModuleModule } from '../../common-module/common-module.module';
import { AsignSupervisorComponent } from './asign-supervisor/asign-supervisor.component';


@NgModule({
  declarations: [
    SettingsComponent,
    RegistrationsComponent,
    AssignmentComponent,
    AsignSupervisorComponent,
    
  ],
  imports: [
    CommonModule,
    TabsModule,
    SettingsRoutingModule,
    AlertModule,
    NgMultiSelectDropDownModule,
    FormsModule,
    CommonModuleModule
  ]
})
export class SettingsModule {
   
 }
