import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LawyersListRoutingModule } from './lawyers-list-routing.module';
import { PageHeaderModule } from './../../shared';
import { LawyersListComponent } from './lawyers-list.component';


@NgModule({
  declarations: [LawyersListComponent],
  imports: [
    CommonModule,
    LawyersListRoutingModule,
    PageHeaderModule
  ]
})
export class LawyersListModule { }
