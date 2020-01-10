import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CasesLawyerRoutingModule } from './cases-lawyer-routing.module';
import { CasesLawyerComponent } from './cases-lawyer.component';
import { PageHeaderModule } from './../../shared';

@NgModule({
  declarations: [CasesLawyerComponent],
  imports: [
    CommonModule,
    CasesLawyerRoutingModule,
    PageHeaderModule
  ]
})
export class CasesLawyerModule { }
