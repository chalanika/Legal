import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { CategoryRoutingModule } from './category-routing.module';
import { PageHeaderModule } from './../../shared';
import {CategoryComponent} from './category.component';

@NgModule({
  declarations: [CategoryComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    PageHeaderModule,
    FormsModule,
    NgbModule
  ]
})
export class CategoryModule { }
