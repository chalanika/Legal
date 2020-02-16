import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PageHeaderModule } from './../../shared';
import { PostComponent } from './post.component';
import { ReactiveFormsModule , FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PostComponent],
  imports: [
    CommonModule,
    PostRoutingModule,
    PageHeaderModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PostModule { }
