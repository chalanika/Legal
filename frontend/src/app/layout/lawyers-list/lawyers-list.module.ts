import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LawyersListRoutingModule } from './lawyers-list-routing.module';
import { PageHeaderModule } from './../../shared';
import { LawyersListComponent } from './lawyers-list.component';
import { LawyerComponent } from './lawyer/lawyer.component';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [LawyersListComponent, LawyerComponent],
  imports: [
    CommonModule,
    LawyersListRoutingModule,
    PageHeaderModule,
    NgbModule,
    FormsModule,
    Ng2SearchPipeModule
  ]
})
export class LawyersListModule { }
