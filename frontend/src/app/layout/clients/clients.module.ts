import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { PageHeaderModule } from './../../shared';
import { ClientsComponent } from './clients.component';

@NgModule({
  declarations: [ClientsComponent],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    PageHeaderModule
  ]
})
export class ClientsModule { }
