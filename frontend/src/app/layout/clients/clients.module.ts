import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { PageHeaderModule } from './../../shared';
import { ClientsComponent } from './clients.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ClientsComponent],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    NgbModule,
    PageHeaderModule
  ]
})
export class ClientsModule { }
