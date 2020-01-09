import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentCreateRoutingModule } from './appointment-create-routing.module';
import { PageHeaderModule } from './../../shared';
import { AppointmentCreateComponent } from './appointment-create.component';
import { FormsModule } from '@angular/forms';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';


@NgModule({
  declarations: [AppointmentCreateComponent],
  imports: [
    CommonModule,
    AppointmentCreateRoutingModule,
    PageHeaderModule,
    FormsModule,
    DlDateTimeDateModule,  // <--- Determines the data type of the model
    DlDateTimePickerModule,
  ],
  providers:[FormsModule,]
})
export class AppointmentCreateModule { }
