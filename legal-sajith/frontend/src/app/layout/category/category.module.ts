import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { PageHeaderModule } from './../../shared';
import {CategoryComponent} from './category.component';

@NgModule({
  declarations: [CategoryComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    PageHeaderModule
  ]
})
export class CategoryModule { }
