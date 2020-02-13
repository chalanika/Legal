import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LawyerRoutingModule } from './lawyer-routing.module';
import { LawyerComponent } from './lawyer.component';

@NgModule({
  declarations: [LawyerComponent],
  imports: [
    CommonModule,
    LawyerRoutingModule,
    NgbModule

  ]
})
export class LawyerModule { }
