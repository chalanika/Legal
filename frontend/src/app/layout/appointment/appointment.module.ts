import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentRoutingModule } from './appointment-routing.module';
import { PageHeaderModule } from './../../shared';
import { AppointmentComponent} from './appointment.component';

@NgModule({
  declarations: [AppointmentComponent],
  imports: [
    CommonModule,
    AppointmentRoutingModule,
    PageHeaderModule
  ]
})
export class AppointmentModule { }
