import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientDisplayRoutingModule } from './client-display-routing.module';
import { PageHeaderModule } from 'src/app/shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClientDisplayComponent } from './client-display.component';

@NgModule({
  declarations: [ClientDisplayComponent],
  imports: [
    CommonModule,
    ClientDisplayRoutingModule,
    PageHeaderModule,
    NgbModule
  ]
})
export class ClientDisplayModule { }
